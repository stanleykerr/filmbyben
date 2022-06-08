import { useState, useEffect, FormEvent } from "react";

import Router from "next/router";

import { useUser } from "@/lib/hooks";

import type { NextPageWithLayout } from "@/types";
import type { ReactElement } from "react";

const LoginPage: NextPageWithLayout = () => {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const target = e.currentTarget as typeof e.currentTarget & {
      email: { value: string };
      password: { value: string };
    };

    const body = {
      email: target.email.value,
      password: target.password.value,
    };

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const userObj = await res.json();
      // set user to useSWR state
      mutate(userObj);
    } else {
      setErrorMsg("Incorrect username or password. Try better!");
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push("/cms");
  }, [user]);

  return (
    <>
      <h1>Login</h1>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <label>
            <span>Email</span>
            <input type="email" name="email" required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" required />
          </label>
          <div className="submit">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

LoginPage.getLayout = (page: ReactElement) => <>{page}</>;

export default LoginPage;
