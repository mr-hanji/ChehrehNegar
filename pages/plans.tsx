import React, { useEffect } from "react";
import data from "@/data/plan.json";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "@/redux/slices/ProfilesSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const plans = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const token = Cookies.get("token");
  const profileData = useSelector((state: any) => state.profile.ProfileData);
  const dispatch = useDispatch();
  const router = useRouter();

  const handelBuyPlan = (name: string) => {
    if (
      profileData?.firstName &&
      profileData?.lastName &&
      profileData?.mobile &&
      profileData?.nationalCode &&
      profileData?.birthday
    ) {
      if (profileData?.plan) {
        axios
          .put(
            `${baseUrl}/api/user/edit-profile`,
            {
              plan: name,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log("====================================");
            console.log(res);
            console.log("====================================");
            toast.success("successful transaction");
          })
          .catch((err) => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            toast.error("please try again");
          });
      } else {
        axios
          .post(
            `${baseUrl}/api/plans`,
            {
              name: name,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log("====================================");
            console.log(res);
            console.log("====================================");
            toast.success("successful transaction");
          })
          .catch((err) => {
            console.log("====================================");
            console.log(err);
            console.log("====================================");
            toast.error("please try again");
          });
      }
    } else {
      toast.warning("please complete your profile");
      router.push("/dashboard/profile");
    }
  };

  return (
    <div className="bg-gray-300 h-[100vh] px-[2.84vw] pt-[2.15vh] overflow-y-hidden">
      <h2 className="font-[600] text-[3.13vh]">CHOOSE YOUR PLAN</h2>
      <p className="mb-[2.63vh] text-[1.86vh] font-[400]">
        Choose your plan to work with the system
      </p>
      <div className="flex items-center gap-[2.75vw] justify-center">
        {data.planitems.map((item) => {
          return (
            <div
              key={item.name}
              className="flex items-center flex-col bg-white px-[1.39vw] py-[3.71vh] rounded-[1.63vw]"
            >
              <h3 className="text-[2.05vh] font-[700]">{item.name}</h3>
              <p className="text-[1.54vh]">Monthly Charge</p>
              <h2 className="text-[4.39vh] font-[900] text-[#4880FF]">
                {item.price}
              </h2>
              <div className="w-full h-[0.1vh] bg-black"></div>
              <ul className="flex items-center flex-col gap-[2.76vh] py-[3.71vh]">
                {item.lists.map((list, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        "text-[1.76vh] font-[600] " +
                        (list.itHas ? "" : "opacity-40")
                      }
                    >
                      {list.text}
                    </li>
                  );
                })}
              </ul>
              <div className="w-full h-[0.1vh] bg-black"></div>
              <button
                className="px-[3.11vw] py-[1.76vh] border-[#4880FF] border-[0.14vw] rounded-[2.08vw] mt-[2.79vh] mb-[2.19vh]"
                onClick={() => {
                  handelBuyPlan(item.name);
                }}
              >
                Get Started
              </button>
              <Link
                className="text-black font-[700] text-[1.54vh] underline"
                href={"#"}
              >
                Start Your 7 Day Free Trial
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default plans;
