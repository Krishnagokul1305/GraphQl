import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Tabs from "@/app/_components/profile/Tabs";
import Modal from "@/app/_components/modal/Modal";
import InviteUsersForm from "@/app/_components/forms/InviteUsersForm";
import CreateUpdateTask from "@/app/_components/Task/CreateUpdateTask";
import { getProjectById } from "@/app/lib/data-service";
import { formatDateTime } from "@/app/utils/helper";
import Link from "next/link";

async function layout({ children, params }) {
  const { id } = await params;
  const data = await getProjectById(id);
  return (
    <div className="space-y-5">
      <div className="py-4 rounded-md px-3 md:px-6 pb-3 bg-sidebar space-y-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/projects/${data._id}`}>
                {data.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl font-bold">{data.name}</h1>

        {/* Meta Info */}
        <div className="flex gap-4 justify-between w-full flex-col md:flex-row md:items-center">
          <p className="text-sm text-muted-foreground">
            Created on:{" "}
            <span className="text-foreground">
              {formatDateTime(data.createdAt).date}
            </span>
          </p>
          <div className="flex gap-2 flex-col md:flex-row md:items-center">
            <Modal
              title=" Invite People to this Project"
              description="Invite existing team members or add new ones."
              Trigger={<Button variant="primary">+ Invite members</Button>}
            >
              <InviteUsersForm
                projectId={data._id}
                existingMembers={data?.members}
              />
            </Modal>
            <Link href={`/projects/${data._id}/createTask`}>
              <Button variant="outline" className="p-4 w-full ">
                + Add Task
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className=" gap-5 ">
        <div className="space-y-5">
          <div className="bg-sidebar flex items-center justify-between rounded-md">
            <div>
              <Tabs projectId={data._id} />
            </div>
            {/* <Button className="me-3 bg-black text-white">Filter</Button> */}
          </div>
          <main className=" rounded-md">{children}</main>
        </div>
        {/* <div className="bg-sidebar rounded-md">
          <UserList />
        </div> */}
      </div>
    </div>
  );
}

export default layout;
