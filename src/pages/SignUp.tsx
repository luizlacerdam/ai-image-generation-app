import SignUpForm from "@/components/SignUpForm";

const SignUp = () => {
  return (
    <div className="container-wrapper section-soft flex flex-1 flex-col pb-6">
      <div className="theme-container container flex flex-1 scroll-mt-20 flex-col">
        <div className="bg-background flex flex-col overflow-hidden rounded-lg border bg-clip-padding md:flex-1 xl:rounded-xl">
          <div className="relative container hidden flex-1 shrink-0 items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="text-primary relative hidden h-full flex-col p-10 lg:flex dark:border-r">
              <div className="bg-primary/5 absolute inset-0">
                <div className="relative z-20 flex items-center text-lg font-medium">
                  luiz's AIGenerator
                </div>
                <div className="relative z-20 mt-auto">
                  <blockquote className="leading-normal text-balance">
                    "Creativity is intelligence having fun." <br />- Albert
                    Einstein
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center lg:h-[1000px] lg:p-8">
              <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
                <SignUpForm />
                <div className="grid gap-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
