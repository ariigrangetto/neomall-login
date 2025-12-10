import { useForm } from "react-hook-form";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    await login(data);
  });
  return (
    <>
      <h1>Login</h1>
    </>
  );
}
