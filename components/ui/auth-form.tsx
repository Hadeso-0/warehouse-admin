"use client"

import * as z from "zod"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signIn } from "next-auth/react"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginformSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type LoginFormValues = z.infer<typeof LoginformSchema>

const RegisterformSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});
type RegisterFormValues = z.infer<typeof RegisterformSchema>

export function UserAuthLoginForm({ className, ...props }: UserAuthFormProps) {

  const params = useParams();
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  const toastMessage = 'Login Successful';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginformSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleGoogleLogin = async () => {
    signIn('google')
  }

  async function onSubmit(data: LoginFormValues) {
    try {
      setIsLoading(true);
      
      signIn('credentials',{
        ...data,
        redirect: false,
      })

      router.push(`/`);
      toast.success(toastMessage);
    
    } catch (error: any) {
      
      toast.error('Something went wrong.');
    
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email"
                      placeholder="name@example.com"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off" 
                      disabled={loading}  
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" 
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={loading} 
                      placeholder="PASSWORD" 
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto mt-10" type="submit">
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={loading} onClick={handleGoogleLogin}>
        {loading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}

export function UserAuthRegisterForm({ className, ...props }: UserAuthFormProps) {

  const params = useParams();
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  const toastMessage = 'Sign-Up Successful';

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterformSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const handleGoogleLogin = async () => {
    signIn('google')
  }

  async function onSubmit(data: RegisterFormValues) {
    try {
      setIsLoading(true);
      
      await axios.post(`/api/sign-up`, data);
      
      router.refresh();
      router.push(`/sign-in`);
      toast.success(toastMessage);
    
    } catch (error: any) {
      
      toast.error('Something went wrong.');
    
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text"
                      placeholder="QuickShop"
                      autoCapitalize="none"
                      autoCorrect="off" 
                      disabled={loading}  
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email"
                      placeholder="name@example.com"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off" 
                      disabled={loading}  
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" 
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={loading} 
                      placeholder="PASSWORD" 
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto mt-10" type="submit">
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign-Up with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={loading} onClick={handleGoogleLogin}>
        {loading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}