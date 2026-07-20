"use client";

import { useState, useTransition, useRef } from "react";
import { Plus, Edit, Trash2, X, Upload, Image, FileText } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  featured: boolean;
  readTime: number | null;
  image?: string | null;
}

interface BlogManagerProps {
  initialPosts: Post[];
}

const BLOG_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect fill='%2305080F' width='400' height='225'/%3E%3Ctext x='50%25' y='45%25' fill='%23ffffff12' font-family='system-ui' font-size='14' text-anchor='middle' dominant-baseline='middle'%3EBlog Post%3C/text%3E%3Ctext x='50%25' y='60%25' fill='%23ffffff08' font-family='system-ui' font-size='28' text-anchor='middle' dominant-baseline='middle'%3E%3C/tspan%3E%3C/svg%3E";

export function BlogManager({ initialPosts }: BlogManagerProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured: false,
    readTime: "",
  });

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    setImageAlt("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function uploadImage(): Promise<{ asset: { _type: string; _ref: string }; url: string } | null> {
    if (!imageFile) return null;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", imageFile);
      fd.append("alt", imageAlt);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) return null;
      return await res.json();
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      let imageData: { asset: { _type: string; _ref: string }; url: string } | null = null;
      if (imageFile) {
        imageData = await uploadImage();
      }

      const method = editingId ? "PUT" : "POST";
      const body = editingId
        ? { _id: editingId, ...formData, featuredImage: imageData?.asset || undefined }
        : { ...formData, featuredImage: imageData?.asset || undefined };

      const res = await fetch("/api/admin/blog", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        const newPost = {
          ...data.post,
          image: imageData?.url || data.post.image || null,
        };
        if (editingId) {
          setPosts(posts.map((p) => (p._id === editingId ? { ...p, ...newPost } : p)));
        } else {
          setPosts([newPost, ...posts]);
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
    removeImage();
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
    setImagePreview(post.image || null);
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
          <span className="hidden sm:inline">New Post</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl border border-input shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-input">
              <h3 className="text-lg font-semibold text-foreground">{editingId ? "Edit Post" : "New Post"}</h3>
              <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Featured Image</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-full h-48 border-2 border-dashed border-input rounded-xl cursor-pointer hover:border-foreground/30 transition-colors overflow-hidden bg-secondary flex items-center justify-center"
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeImage(); }}
                        className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-full text-foreground/70 hover:text-foreground transition-colors"
                      >
                        <X className="size-4" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Upload className="size-8" />
                      <span className="text-sm">Click to upload image</span>
                      <span className="text-xs">JPG, PNG, WebP</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Alt text</label>
                    <input
                      type="text"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      placeholder="Describe the image"
                      className="w-full px-3 py-1.5 text-sm bg-background border border-input rounded-lg focus:outline-none focus:border-ring"
                    />
                  </div>
                )}
              </div>
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
                  value={formData.slug}
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
                <button
                  type="submit"
                  disabled={isPending || uploading}
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : isPending ? "Saving..." : editingId ? "Update Post" : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden md:block bg-card rounded-xl border border-input shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Featured</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Read Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Published</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-input">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-muted-foreground">
                    No blog posts yet
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post._id} className="hover:bg-secondary transition-colors">
                    <td className="px-6 py-4">
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                          <Image className="size-5 text-foreground/20" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{post.title}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{post.slug}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{post.featured ? "Yes" : "No"}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{post.readTime || "-"}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(post)}
                          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
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

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {posts.length === 0 ? (
          <div className="bg-card rounded-xl border border-input shadow-card p-8 text-center">
            <FileText className="size-8 text-foreground/20 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No blog posts yet</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="bg-card rounded-xl border border-input shadow-card overflow-hidden">
              <div className="aspect-[16/9] relative bg-secondary">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="size-8 text-foreground/15 mx-auto mb-1" />
                      <span className="text-xs text-muted-foreground">No image</span>
                    </div>
                  </div>
                )}
                {post.featured && (
                  <span className="absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2">{post.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span>{post.readTime ? `${post.readTime} min` : "-"}</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-input">
                  <button
                    onClick={() => startEdit(post)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-foreground/70 hover:text-foreground bg-secondary rounded-lg transition-colors"
                  >
                    <Edit className="size-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    disabled={isPending}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-red-500 hover:text-red-600 bg-red-500/5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
