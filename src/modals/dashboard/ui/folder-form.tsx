"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useStore } from "@/zustand/store";

const FolderForm = () => {
  const formSchema = z.object({
    name: z.string().min(1, "Folder name is required"),
    description: z.string().min(1, "Folder description is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const userId = useStore((state) => state.userData.telegramId);

  return (
    <div>
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(async (data) => {
            const res = await axios.post("/api/createFolder", {
              name: data.name,
              description: data.description,
              userId,
            });

            const resData = await res.data;
            console.log("hola");

            console.log("resData : " + resData);

            toast(`${resData.message}`);
            form.reset();
          })}
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-200">Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-900/60 border-neutral-700 text-white placeholder:text-neutral-500"
                    {...field}
                    placeholder="Folder Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-200">Description</FormLabel>
                <FormControl>
                  <Input
                    className="bg-neutral-900/60 border-neutral-700 text-white placeholder:text-neutral-500"
                    {...field}
                    placeholder="Folder Description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <Button
            variant={"destructive"}
            type="submit"
            className="px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <span className="text-black cursor-pointer">Create Folder</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FolderForm;
