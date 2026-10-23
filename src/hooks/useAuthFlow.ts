import { useSignIn, useSignUp, useSSO } from "@clerk/expo";

export type AuthMode = "sign-up" | "sign-in";
export type SocialProvider = "Google" | "Facebook" | "Apple";

const ssoStrategies = {
  Google: "oauth_google",
  Facebook: "oauth_facebook",
  Apple: "oauth_apple",
} as const;

const fallbackMessage = "Please try again.";

// Wraps Clerk's sign-in / sign-up flows for the auth screen.
// Every function resolves to an error message, or undefined when it worked.
// The route guards in the layouts react to the active session, so nothing navigates here.
export function useAuthFlow(mode: AuthMode) {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { startSSOFlow } = useSSO();

  // Sign up: create the account with email + password, then email a code.
  // Sign in: email a one-time code to the existing account.
  const sendCode = async (email: string, password: string) => {
    if (!email) return "Enter your email address.";

    if (mode === "sign-up") {
      if (!password) return "Enter a password.";

      const created = await signUp.password({ emailAddress: email, password });
      if (created.error) return created.error.longMessage ?? created.error.message;

      const sent = await signUp.verifications.sendEmailCode();
      return sent.error ? (sent.error.longMessage ?? sent.error.message) : undefined;
    }

    const sent = await signIn.emailCode.sendCode({ emailAddress: email });
    return sent.error ? (sent.error.longMessage ?? sent.error.message) : undefined;
  };

  const verifyCode = async (code: string) => {
    if (mode === "sign-up") {
      const verified = await signUp.verifications.verifyEmailCode({ code });
      if (verified.error) return verified.error.longMessage ?? verified.error.message;

      const finalized = await signUp.finalize();
      return finalized.error ? (finalized.error.longMessage ?? finalized.error.message) : undefined;
    }

    const verified = await signIn.emailCode.verifyCode({ code });
    if (verified.error) return verified.error.longMessage ?? verified.error.message;

    const finalized = await signIn.finalize();
    return finalized.error ? (finalized.error.longMessage ?? finalized.error.message) : undefined;
  };

  const continueWithSocial = async (provider: SocialProvider) => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: ssoStrategies[provider],
      });

      // No session means the user closed the browser: not an error.
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      return error instanceof Error ? error.message : fallbackMessage;
    }
  };

  return { sendCode, verifyCode, continueWithSocial };
}
