import React, { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  author: z
    .string()
    .min(4, {
      message: "Author must be at least 4 characters.",
    })
    .max(30, {
      message: "Author must not be longer than 30 characters.",
    }),
  body: z
    .string()
    .min(10, {
      message: "Comment must be at least 10 characters.",
    })
    .max(160, {
      message: "Comment must not be longer than 160 characters.",
    }),
});

type CommentsProps = {
  slug: string;
  apiUrl: string;
};

const Comments: React.FC<CommentsProps> = ({ slug, apiUrl }) => {
  // CommentsProps = ( { slug, apiUrl }) => {
  console.log("Rendering Comments component"); // Add this line
  const url = useMemo(
    () => `${apiUrl}/api/posts/${slug}/comments`,
    [apiUrl, slug],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      body: "",
    },
  });
  //
  // Schema for a single comment
  const commentSchema = z.object({
    id: z.number(),
    author: z.string(),
    body: z.string(),
    post_slug: z.string().optional(),
  });

  /*****
  // Schema for metadata in responses
  const metaSchema = z.object({
    served_by: z.string(),
    duration: z.number(),
    changes: z.number(),
    last_row_id: z.number(),
    changed_db: z.boolean(),
    size_after: z.number(),
    rows_read: z.number(),
    rows_written: z.number(),
  });

  // Schema for GET response - returns array of comments
  const getResponseSchema = z.object({
    success: z.boolean(),
    meta: metaSchema,
    results: z.array(commentSchema),
  });

  // Schema for POST response - returns single created comment
  const postResponseSchema = z.object({
    success: z.boolean(),
    meta: metaSchema,
    results: z.array(commentSchema).length(1), // Expects exactly one comment
  });
*******/

  type Comment = z.infer<typeof commentSchema>;

  const responseSchema = z.object({
    success: z.boolean(),
    results: z.array(commentSchema),
  });

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const initialComments = useMemo(
    () => [
      {
        id: 1,
        author: "John Doe",
        body: "This is the first comment.",
      },
      {
        id: 2,
        author: "Jane Doe",
        body: "This is the second comment.",
      },
      {
        id: 3,
        author: "Bob Doe",
        body: "This is the third comment.",
      },
      {
        id: 4,
        author: "Alice Doe",
        body: "This is the fourth comment.",
      },
    ],
    [],
  );
  /*****
  // eslint-disable-next-line
  const dummyDataFetch = () => {
    new Promise((resolve) =>
      setTimeout(() => resolve(initialComments), 2000),
    ).then((data) => {
      console.log("Dummy fetched data: ", data);
      setComments(data as Comment[]);
      setIsLoading(false);
    });
  };
*****/
  useEffect(() => {
    console.log("apiUrl: ", url);
    console.log("Fetching comments");
    setIsLoading(true);
    // dummyDataFetch();
    fetch(`${url}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Add this line
        const parsedData = responseSchema.parse(data);
        setComments(parsedData.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, initialComments]);

  // From shadcn docs
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("Submitting comment:", data);
      const response = await fetch(`${apiUrl}/api/posts/${slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log("Raw response data:", res);

      // Instead of parsing single comment, parse whole response
      const parsedData = responseSchema.parse(res);
      // Get the newly created comment from results array
      const createdComment = parsedData.results[0]; // Changed variable name here
      setComments([...comments, createdComment]);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-center">Comments</h2>
      <section className="my-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.author}</strong>: {comment.body}
              </li>
            ))}
          </ul>
        )}
      </section>
      <Separator className="my-4 h-[3px]" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your name"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Your comment" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Comment</Button>
        </form>
      </Form>
    </div>
  );
};

export default Comments;
