const OderoLogoSmall = () => {
    return (
        <picture>
            <source srcSet="/odero-logos/odero-small-dark.svg" media="(prefers-color-scheme: dark)" />
            <img src="/odero-logos/odero-small.svg" alt="Odero Logo Small" width={35} height={35} />
        </picture>
    )
}

export default OderoLogoSmall