import { useAtomValue } from "jotai";
import {
  UIMatch,
  useLocation,
  useMatches,
  useNavigate,
} from "react-router-dom";
import { categoriesStateUpwrapped } from "@/state";
// import headerLogoImage from "@/static/header-logo.svg";
import Gowash from "@/static/gowash.png"
import { BackIcon } from "./vectors";
import { useMemo } from "react";
import { useRouteHandle } from "@/hooks";

export default function Header() {
  const categories = useAtomValue(categoriesStateUpwrapped);
  const navigate = useNavigate();
  const location = useLocation();
  const [handle, match] = useRouteHandle();

  const title = useMemo(() => {
    if (handle) {
      if (typeof handle.title === "function") {
        return handle.title({ categories, params: match.params });
      } else {
        return handle.title;
      }
    }
  }, [handle, categories]);

  const showBack = location.key !== "default" && handle?.back !== false;

  if (handle?.logo) {
    return (
      <div className="h-14 w-full flex items-center px-4">
          <img src={Gowash} className="max-h-full flex-none" />
          <div className="text-[600]">Gowash</div>
      </div>
    );
  }

  return (
    <div className="h-12 w-full flex items-center pl-2 pr-[106px] py-2 space-x-1">
      {showBack && (
        <div className="p-2 cursor-pointer" onClick={() => navigate(-1)}>
          <BackIcon />
        </div>
      )}
      <div className="text-xl font-medium truncate">{title}</div>
    </div>
  );
}
