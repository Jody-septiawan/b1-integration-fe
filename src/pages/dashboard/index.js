import { SideBar } from "@/components/SideBar";
import { Foods } from "@/features/dashboard/routes/Foods";
import { useUser } from "@/hooks/useUser";
import { MetaLayout } from "@/layouts/MetaLayout";

export default function Home() {
  useUser();
  return (
    <MetaLayout title="Dashboard">
      <div className="flex">
        <SideBar />
        <div className="flex-1 h-full">
          <Foods />
        </div>
      </div>
    </MetaLayout>
  );
}
