import { DM_Sans } from "next/font/google";
import Image from "next/image";
import PBSLogo from "../data/PBSFM_Logo.png";

const dm_sans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});
const SuccessMessage = () => {
  const paragraphFormat = "py-3 text-xl";

  return (
    <div className="flex justify-between">
      <div className="hidden w-1/4 md:block"></div>

      <div className={`${dm_sans.className}`}>
        <p className={paragraphFormat}>
          Your playlist has been saved and is accessable through your Spotify
          account.
        </p>
        <p className={paragraphFormat}>
          To make more playlists, choose another show from the dropdown.
        </p>
        <p className={paragraphFormat}>
          Please consider donating or subscribing to PBS 106.7FM to support the
          hardworking volunteers who produce these wonderful tracklists.
        </p>
        <div className=" my-5 flex justify-center">
          <a
            href="https://www.pbsfm.net/memberships/publicregistration.php"
            target="_blank"
            className="border rounded-md p-3 border-purple-500"
          >
            <Image
              src={PBSLogo}
              width={300}
              height={300}
              alt="PBS FM Logo Image"
            />
          </a>
        </div>
      </div>
      <div className="hidden w-1/4 md:block"></div>
    </div>
  );
};

export default SuccessMessage;
