import Link from "next/link";
import { Unbounded } from "next/font/google";
import { Pirata_One } from "next/font/google";
import { IoMdRadio } from "react-icons/io";
import Image from "next/image";
import LinkedInLogo from "@/data/assets/LI-Logo.png";
import GithubLogo from "@/data/assets/github-mark.png";
import ResumeThumbnail from "@/data/assets/Resume-thumbnail.png";

const unbounded = Unbounded({
  weight: "300",
  subsets: ["latin"],
});

const pirata = Pirata_One({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});

const About = () => {
  return (
    <div>
      <div className="p-2 bg-navBarPurple flex justify-between items-center md:p-6">
        <h2
          className={`${pirata.className} text-black text-4xl md:mx-8 md:text-6xl`}
        >
          PBSpotify
        </h2>
        <Link
          className={`${unbounded.className} hover:underline text-sm md:mr-20 md:text-base`}
          href={"/"}
        >
          Back
        </Link>
      </div>

      <div className="bg-babyPink min-h-screen">
        <div className="container mx-auto">
          <div className={`${unbounded.className} py-4 px-4`}>
            <p className="py-2">
              PBSpotify creates Spotify playlists based on the track lists of
              shows broadcast on PBS 106.7FM, a community radio station in
              Melbourne, Australia. To achieve this the app interacts with two
              different external APIs.
            </p>
            <p className="py-2">
              <Link
                className="underline text-blue-900"
                href={"https://airnet.org.au/rest/stations/3pbs/programs"}
                target="_blank"
                rel="noreferrer"
              >
                The First{" "}
              </Link>
              is a publically available Rest API which provides JSON data about
              PBS FM including information about particular PBS FM shows, and
              track lists for each episode of a show which are provided weekly
              by the PBS FM Show Host.
            </p>
            <p className="py-2">
              The second API is the Spotify Web API through which Spotify
              provides functionality for one of their users to authorise a third
              party app like this one to create and make changes to one of their
              playlists via thier
              <Link
                className="underline text-blue-900"
                href={
                  "https://developer.spotify.com/documentation/web-api/tutorials/code-flow"
                }
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                OAuth 2.0 service.
              </Link>
            </p>
            <div className="py-4">
              <div className="text-xl text-center underline">Links</div>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="object-contain w-60">
                  <Link
                    href={"https://github.com/baden119/pbspotify_v3"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={GithubLogo}
                      alt="Github Repo"
                      width={240}
                      height={240}
                    ></Image>
                    PBSpotify Github Repo
                  </Link>
                </div>
                <div className="object-contain w-60">
                  <Link
                    href={"https://github.com/baden119/pbspotify_v3"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={LinkedInLogo}
                      alt="LinkedIn"
                      width={2212}
                      height={540}
                    ></Image>
                    {/* <div className="text-center">Baden's LinkedIn</div> */}
                  </Link>
                </div>
                <div className="object-contain w-60">
                  <Link
                    href={
                      "https://drive.google.com/file/d/1imyux4aYUyrB1iAZi0FBgyDQD8wIYMPh/view?usp=sharing"
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={ResumeThumbnail}
                      alt="Resume Thumbnail"
                      width={635}
                      height={898}
                    ></Image>
                    {/* <div className="text-center">Baden's Resume</div> */}
                  </Link>
                </div>
              </div>
            </div>
            <Link href={"/"}>
              <button className="bg-navBarPurple flex items-center hover:bg-altNavBarPurple text-black  py-2 px-4 rounded-full md:py-5 md:px-10">
                <div className="mr-1">{<IoMdRadio />}</div>
                <div className={`${unbounded.className}`}>Back</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;

//   <Link
//     href={"https://www.linkedin.com/in/baden-allen-951099275"}
//     target="_blank"
//     rel="noreferrer"
//     className="w-full sm:w-1/2 md:w-1/3 flex flex-col items-center mb-8"
//   >
//     <Image
//       src={LinkedInLogo}
//       alt="LinkedIn"
//       // width={2212}
//       // height={540}
//       fill
//       // className="w-full h-auto object-contain"
//     ></Image>
//     Badens LinkedIn
//   </Link>
//   {/* <h1>Baden's Resume</h1> */}
