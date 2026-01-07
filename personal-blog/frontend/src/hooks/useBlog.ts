import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";
import type { Blog } from "@repo/shared";

export function useBlogList(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: () => apiClient.blogs.list(page, limit),
  });
}

export function useBlog(id: number) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => apiClient.blogs.get(id),
  });
}

export function useFavoriteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.blogs.favorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      apiClient.admin.blog.create(title, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      title,
      content,
    }: {
      id: number;
      title?: string;
      content?: string;
    }) => apiClient.admin.blog.update(id, title, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.admin.blog.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
}
