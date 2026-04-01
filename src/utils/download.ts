/**
 * 保存 Blob 为文件（原生实现）
 */
export function saveBlob(data: BlobPart, filename = "file") {
  const blob = new Blob([data]);

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

/**
 * 从响应头中解析文件名
 */
export function getFilename(headers: any) {
  const disposition = headers?.["content-disposition"];
  if (!disposition) return "file";

  const match = disposition.match(/filename\*=UTF-8''(.+)|filename=(.+)/);

  return decodeURIComponent(match?.[1] || match?.[2] || "file");
}
