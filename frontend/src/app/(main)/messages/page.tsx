import SearchSection from "@/components/main/search-section";
import Blob from "@/components/message/blob";
import Image from "next/image";
import { io } from "socket.io-client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log(socket.id);
});

const messageSchema = z.object({
  message: z.string().min(1),
});

const Messages = () => {
  // const form = useForm<z.infer<typeof messageSchema>>({
  //   defaultValues: {
  //     message: "",
  //   },

  //   resolver: zodResolver(messageSchema),
  // });
  const items = [
    "Lecturer 1",
    "Lecturer 2",
    "Omoaruna Mercy",
    "Okechukwu Eluwa",
    "Ayemenre Oseghale",
  ];
  return (
    <div className="flex ml-[26px] mb-6 justify-between">
      <section className="w-2/3 mt-[44px] mb-[46px] h-screen ">
        <SearchSection />
        <div className="w-[768px] h-[683px] bg-white rounded-[24px] pl-[29px] pr-[60px] pt-3 mb-[28px]">
          <div className="flex gap-x-[17px] items-center mb-[28px]">
            <Image src="/mercy.svg" width={55} height={55} alt="" />
            <p className="font-[700] text-[22px] text-[#6A6E74]">Mercy</p>
          </div>
          <div className="ml-[55px] bg-[#DBE0EE] w-[185px] py-5 rounded-[24px] px-4 mb-[66px]">
            Hello
          </div>

          <div className="w-full flex justify-end">
            <div className="bg-[#509FFCB8] w-[185px] py-5 rounded-[24px] px-4">
              Hey, How are you
            </div>
          </div>
          <input className="bg-red-200" />
        </div>
      </section>

      <section className="mt-[180px] w-1/3 flex flex-col gap-y-6 items-center">
        <div>
          <h3 className="font-[500] mb-2">Lecturers</h3>
          <div className="flex flex-col gap-y-2">
            {items.slice(0, 2).map((name: string, index: number) => (
              <Blob key={index} name={name} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-[500] mb-2">Students</h3>
          <div className="flex flex-col gap-y-2">
            {items.slice(2).map((name: string, index: number) => (
              <Blob key={index} name={name} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Messages;
