'use server';
 
import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { emailSchema, loginSchema, registerSchema, resetpwSchema } from './zod';
import { getStrapiURL } from './utils';

// sign in
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    // console.log("ERROR >>>>> ", error)

    let errMsg = error.cause?.code;
    let identifier = undefined;

    if (error.cause?.type == "zod") {
      errMsg = error.cause?.code
      identifier = formData.get("identifier")
      return { errMsg, identifier }
    }
    if (error.message == "NEXT_REDIRECT") {
      redirect('/myaccount')
    }
    return { errMsg: "Invalid Credentials", undefined };
  }
}

// sign out
export async function signOutFunction() {
    await signOut({redirectTo: "/"});
}

// sign up
export async function createUser(prevState: string | undefined,  formData: FormData,) {

  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  const parsedCredentials = await registerSchema.safeParseAsync({username, email, password})

  if (!parsedCredentials.success) {
    const formErrors = parsedCredentials.error?.formErrors.fieldErrors
    
    return { formErrors: formErrors }

  }

  const res = await fetch(getStrapiURL('/api/auth/local/register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedCredentials.data),
  });

  const { user, error } = await res.json();

  return { serverErrors: error?.message, email: user?.email }
}
 
// resend verification email
export async function resendVerfy(prevState: string | undefined,  formData: FormData,) {
  
  const email = await formData.get('email');

  const parsedCredentials = await emailSchema.safeParseAsync({email})

  if (!parsedCredentials.success) {
    const formErrors = parsedCredentials.error?.formErrors.fieldErrors
    
    return { formErrors: formErrors }

  }

  const res = await fetch(getStrapiURL('/api/auth/send-email-confirmation'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedCredentials.data),
  });

  const data = await res.json();

  return { serverErrors: data.error?.message, data: data }

}

// forgot password
export async function forgotPassword(prevState: string | undefined,  formData: FormData,) {
  
  const email = await formData.get('email');

  const parsedCredentials = await emailSchema.safeParseAsync({email})

  if (!parsedCredentials.success) {
    const formErrors = parsedCredentials.error?.formErrors.fieldErrors
    
    return { formErrors: formErrors }

  }

  const res = await fetch(getStrapiURL('/api/auth/forgot-password'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(parsedCredentials.data),
  });

  const data = await res.json();

  return { serverErrors: data.error?.message, data: data.ok }
}

// reset password
export async function resetPassword(prevState: string | undefined,  formData: FormData,) {
  
  const code = await formData.get('code');
  const password = await formData.get('password');
  const passwordConfirmation = await formData.get('passwordConfirmation');

  const validation = await resetpwSchema.safeParseAsync({password})

  if (!validation.success) {
    const formErrors = await validation.error?.formErrors.fieldErrors
    return { formErrors: formErrors }
  }

  const validatedPassword = validation.data.password;
  if (validatedPassword !== passwordConfirmation) return { passwordConfirmation: ['passwords do not match'] }

  const res = await fetch(getStrapiURL('/api/auth/reset-password'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: code, password: validatedPassword, passwordConfirmation: passwordConfirmation } ),
  });

  const data = await res.json();
  if (data.error) {
    return { serverErrors: { name: data.error?.name, message: data.error?.message } }
  }

  return { data: data}

}