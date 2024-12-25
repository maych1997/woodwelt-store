import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../backend/connection";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ email: "", password: "" });
	const [load, setLoad] = useState(false);
	const navigate = useNavigate();

	// Input Handlers
	const handleEmail = (e) => {
		setEmail(e.target.value);
		setErrors((prev) => ({ ...prev, email: "" }));
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
		setErrors((prev) => ({ ...prev, password: "" }));
	};

	// Validation function
	const validateLoginForm = (email, password, setErrors) => {
		let isValid = true;
		const newErrors = {};

		if (!email) {
			newErrors.email = "Enter your email";
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = "Enter a valid email address";
			isValid = false;
		}

		if (!password) {
			newErrors.password = "Enter your password";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	// Handle Login
	const handleSignIn = async (e) => {
		e.preventDefault();
		setLoad(true);

		if (validateLoginForm(email, password, setErrors)) {
			try {
				await signInWithEmailAndPassword(auth, email, password)
					.then((result) => {
						if (result) {
							setLoad(false);
							navigate("/");
						}
					})
					.catch((error) => {
						setLoad(false);
						alert(error.message);
					});
			} catch (error) {
				setLoad(false);
				alert(error.message);
			}
		} else {
			setLoad(false);
		}
	};

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="w-1/2 hidden lgl:inline-flex h-full text-white">
				<div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
					<Link to="/">
						<img src={logoLight} alt="logoImg" className="w-28" />
					</Link>
					<div className="flex flex-col gap-1 -mt-1">
						<h1 className="font-titleFont text-xl font-medium">
							Stay signed in for more
						</h1>
						<p className="text-base">When you sign in, you are with us!</p>
					</div>
					<div className="w-[300px] flex items-start gap-3">
						<span className="text-green-500 mt-1">
							<BsCheckCircleFill />
						</span>
						<p className="text-base text-gray-300">
							<span className="text-white font-semibold font-titleFont">
								Get started fast with OREBI
							</span>
							<br />
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
							nisi dolor recusandae consectetur!
						</p>
					</div>
					<div className="w-[300px] flex items-start gap-3">
						<span className="text-green-500 mt-1">
							<BsCheckCircleFill />
						</span>
						<p className="text-base text-gray-300">
							<span className="text-white font-semibold font-titleFont">
								Access all OREBI services
							</span>
							<br />
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
							nisi dolor recusandae consectetur!
						</p>
					</div>
					<div className="flex items-center justify-between mt-10">
						<Link to="/">
							<p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
								© OREBI
							</p>
						</Link>
						<p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
							Terms
						</p>
						<p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
							Privacy
						</p>
						<p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
							Security
						</p>
					</div>
				</div>
			</div>
			<div className="w-full lgl:w-1/2 h-full">
				<form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
					<div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
						<h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
							Sign In
						</h1>
						<div className="flex flex-col gap-3">
							{/* Email Input */}
							<div className="flex flex-col gap-0.5">
								<p className="font-titleFont text-base font-semibold text-gray-600">
									Work Email
								</p>
								<input
									onChange={handleEmail}
									value={email}
									className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
									type="email"
									placeholder="john@workemail.com"
								/>
								{errors.email && (
									<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
										<span className="font-bold italic mr-1">!</span>
										{errors.email}
									</p>
								)}
							</div>

							{/* Password Input */}
							<div className="flex flex-col gap-0.5">
								<p className="font-titleFont text-base font-semibold text-gray-600">
									Password
								</p>
								<input
									onChange={handlePassword}
									value={password}
									className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
									type="password"
									placeholder="Enter your password"
								/>
								{errors.password && (
									<p className="text-sm text-red-500 font-titleFont font-semibold px-4">
										<span className="font-bold italic mr-1">!</span>
										{errors.password}
									</p>
								)}
							</div>

							{/* Submit Button */}
							<button
								onClick={handleSignIn}
								className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
								disabled={load}
							>
								{load ? "Signing In..." : "Sign In"}
							</button>
							<p className="text-sm text-center font-titleFont font-medium">
								Don't have an account?{" "}
								<Link to="/signup">
									<span className="hover:text-blue-600 duration-300">
										Sign up
									</span>
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
