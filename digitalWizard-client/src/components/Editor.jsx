import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor({ value, setFocus }) {
  // 렌더링 될때마다 modules생성되는 현상 방지
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic"],
          ["link", "blockquote", "code", "image"],
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
      },
    };
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "link",
    "blockquote",
    "code",
    "image",
    "align",
    "list",
    "clean",
  ];

  return (
    <ReactQuill
      {...value}
      id="body"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      modules={modules}
      formats={formats}
    />
  );
}
