"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { createRoomAction } from "../actions";


const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  githubLink: z.string().min(1).max(50),
  language: z.string().min(1).max(50),
  tags: z.string().min(1).max(50),
});

export function CreateRoomForm() {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubLink: "",
      language: "",
      tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    await createRoomAction(values);
    router.push("/browse");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Dev Finder Is Awesome" />
              </FormControl>
              <FormDescription>This is your public room name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Im working on a side project, come join me"
                />
              </FormControl>
              <FormDescription>
                Please describe what you are be coding on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
    <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/webdevcody/dev-finder"
                />
              </FormControl>
              <FormDescription>
                Please put a link to the project you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <FormField
          control={form.control}
          name="githubLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/webdevcody/dev-finder"
                />
              </FormControl>
              <FormDescription>
                Please put a link to the project you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder="typescript, nextjs, tailwind" />
              </FormControl>
              <FormDescription>
                List your programming languages, frameworks, libraries so people
                can find you content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}