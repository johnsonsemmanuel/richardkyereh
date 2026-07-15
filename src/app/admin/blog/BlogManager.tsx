"use client";

import { useState, useTransition } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  featured: boolean;
  readTime: number | null;
}

interface BlogManagerProps {
  initialPosts: Post[];
}

export function BlogManager({ initialPosts }: BlogManagerProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured: false,
    readTime: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const url = editingId ? "/api/admin/blog" : "/api/admin/blog";
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { _id: editingId, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        if (editingId) {
          setPosts(posts.map((p) => (p._id === editingId ? { ...p, ...data.post } : p)));
        } else {
          setPosts([data.post, ...posts]);
        }
        resetForm();
      }
    });
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      const res = await fetch("/api/admin/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== id));
      }
    });
  }

  function resetForm() {
    setFormData({ title: "", slug: "", excerpt: "", content: "", featured: false, readTime: "" });
    setShowForm(false);
    setEditingId(null);
  }

  function startEdit(post: Post) {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: "",
      featured: post.featured,
      readTime: post.readTime?.toString() || "",
    });
    setEditingId(post._id);
    setShowForm(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">All Posts ({posts.length})</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-4" />
          New Post
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl border border-input shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-input">
              <h3 className="text-lg font-semibold text-foreground">{editingId ? "Edit Post" : "New Post"}</h3>
              <button onClick={resetForm} className="text-foreground/50 hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:border-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Slug</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") })}
                  required
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:border-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:border-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Content (HTML)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  required
                  className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:border-ring font-mono text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/70 mb-1">Read Time (min)</label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:border-ring"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="size-4 rounded border-input"
                  />
                  <label htmlFor="featured" className="text-sm text-foreground/70">Featured post</label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={resetForm} className="px-4 py-2 text-sm bg-secondary border border-input rounded-lg hover:bg-secondary/80 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isPending} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50">
                  {isPending ? "Saving..." : editingId ? "Update Post" : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl border border-input shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Featured</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Read Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Published</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/50 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-input">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-foreground/50">
                    No blog posts yet
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post._id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{post.title}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{post.slug}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{post.featured ? "Yes" : "No"}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{post.readTime || "-"}</td>
                    <td className="px-6 py-4 text-sm text-foreground/50">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(post)}
                          className="p-1.5 text-foreground/50 hover:text-foreground transition-colors"
                        >
                          <Edit className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          disabled={isPending}
                          className="p-1.5 text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
