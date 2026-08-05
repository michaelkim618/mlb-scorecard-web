import { useState, useEffect } from "react";

export function useBlogIndex() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/blog/index.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load blog index");
        return r.json();
      })
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  return { posts, loading, error };
}

export function useBlogPost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setPost(null);
    fetch(`/blog/posts/${slug}.json`)
      .then((r) => {
        if (!r.ok) throw new Error("Post not found");
        return r.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [slug]);

  return { post, loading, error };
}
