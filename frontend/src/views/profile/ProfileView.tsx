import { useAuth } from "@/hooks/useAuth"
import ProfileForm from "./ProfileForm";
import Spinner from "@/components/Spinner";


export default function ProfileView() {

    const { data, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-100 flex items-center justify-center">
                <Spinner size="lg" label="Cargando..." />
            </div>
        )
    }

    if (data) return (
        <ProfileForm data={data} />
    )
}
