import { useState, useEffect } from "react";

export default function useNews() {
  const [news, setNews]       = useState([]);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/news.json")
      .then(r => r.json())
      .then(d => {
        setNews(d.news || []);
        setUpdatedAt(d.updated_at || null);
      })
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  return { news, updatedAt, loading };
}
