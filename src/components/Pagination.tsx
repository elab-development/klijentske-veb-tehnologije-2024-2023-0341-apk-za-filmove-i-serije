import React from 'react';

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (p: number) => void;
};

export default function Pagination({ page, pageSize, total, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));

  const go = (p: number) => {
    const clamped = Math.max(1, Math.min(totalPages, p));
    if (clamped !== page) onPageChange(clamped);
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={() => go(1)} disabled={page <= 1} aria-label="First page">{'<<'}</button>
      <button onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Previous page">{'<'}</button>
      <span>{page} / {totalPages}</span>
      <button onClick={() => go(page + 1)} disabled={page >= totalPages} aria-label="Next page">{'>'}</button>
      <button onClick={() => go(totalPages)} disabled={page >= totalPages} aria-label="Last page">{'>>'}</button>
    </div> 
    
  );
}
