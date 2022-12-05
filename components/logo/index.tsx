const OderoLogo = () => {
    return (
        <picture>
            <source srcSet="/odero-logos/odero-dark.svg" media="(prefers-color-scheme: dark)" />
            <img src="/odero-logos/odero.svg" alt="Odero Logo" width={95} height={35} />
        </picture>
    )
}

export default OderoLogo