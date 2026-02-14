"use server";

import { setUsernameSchema } from "@/src/_lib/definitions";
import { setUsername } from "@/src/api/services/users";

type ActionState = {
  ok: boolean;
  message: string;
  fieldErrors: Record<string, string[]>;
};

const initial: ActionState = {
  ok: false,
  message: "",
  fieldErrors: {},
};

export async function SetUserAction(prevState: ActionState = initial, formData: FormData): Promise<ActionState> {
  const rawUsername = formData.get("username");
  const rawAvatar = formData.get("avatar");

  const username = typeof rawUsername === "string" ? rawUsername : "";
  const avatar =
    rawAvatar instanceof File && rawAvatar.size > 0
      ? rawAvatar
      : undefined;

  const parsed = setUsernameSchema.safeParse({ username, avatar });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { username: cleanUsername, avatar: cleanAvatar } = parsed.data;

  try {
    await setUsername({ username: cleanUsername, avatar: cleanAvatar });
    return {
      ok: true,
      message: "Username and avatar set successfully",
      fieldErrors: {}
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message || "Failed to sign in.",
      fieldErrors: {}
    };
  };
}
