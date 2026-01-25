export default function StoreUserLoader() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-between bg-white z-50 py-5">
            <span />
            {/* <Image src={LogoImage} alt="logo" width={120} height={120} className="rounded-full" /> */}
            <p className="text-black">Loading your account...</p>
        </div>
    );
};