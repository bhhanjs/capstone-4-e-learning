import { Button } from "@/components/ui/button";
import banner from "@/assets/f.jpg";

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner__container md:container mx-auto">
        <div
          className="banner__content flex justify-end items-center w-full h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="banner__heading flex flex-col justify-center items-start w-1/2 pl-24 pr-12 space-y-5">
            <h2 className="text-4xl text-algo-bright-sage font-bold w-2/3">
              Building in-demand career skills.
            </h2>
            <p className="text-xl text-algo-charcoal w-2/3">
              Empowering you to learn anywhere, anytime.
            </p>
            <div className="flex items-center gap-3">
              <Button className="button-filled ">Courses</Button>
              <Button className="button-border ">Start learning</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
