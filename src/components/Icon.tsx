import Image from "next/image";

const Icon = ({
    src,
    size = 24,
    style = {},
    alt = "icon",
    className = "size-6",
}: {
    src?: any,
    size?: number,
    style?: any,
    alt?: string,
    className?: string
}) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            style={style}
            className={className}
        />
    );
};

export default Icon;