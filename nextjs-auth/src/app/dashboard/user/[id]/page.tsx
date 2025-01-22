import {Backend_URL} from "@/lib/Constants";
import { BellRing } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

type Props = {
    params: {
        id: string;
    }
}

export default async function ProfilePage(props: Props) {

    const session = await getServerSession(authOptions);
    const response = await fetch(Backend_URL + `/user/${props.params.id}`, {
        method:  "GET",
        headers: {
            authorization: `Bearer ${session?.backendTokens.accessToken}`,
            "Content-Type": "application/json",
        },
    })
    console.log({response})
    const user = await response.json()

    return (
        <>
            <Card className={cn("w-[380px]")}>
                <CardHeader>
                    <CardTitle>User profile</CardTitle>
                    <CardDescription>You have 3 unread messages.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <BellRing />
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                                Push Notifications
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Send notifications to device.
                            </p>
                        </div>
                        <Switch />
                    </div>
                    <div className={"flex flex-col items-start gap-4"}>
                        <div className={"flex gap-x-3 items-center"}>
                            <label> name :</label>
                            <p>{user.name}</p>
                        </div>
                        <div className={"flex gap-x-3 items-center"}>
                            <label> Email :</label>
                            <p>{user.email}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">
                       Mark all as read
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
