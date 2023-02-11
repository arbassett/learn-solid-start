import { redirect } from "solid-start"
import { createServerData$ } from "solid-start/server";

export const routeData = () => {
  return createServerData$(() => {
    return redirect("/learn")
  })
}

export default function GoToLearnPage() {
  return null;
}