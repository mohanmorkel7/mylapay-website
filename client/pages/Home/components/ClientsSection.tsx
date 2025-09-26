import ScrollScale from "@/components/ui/scroll-scale";
import Camspay from "@/pages/assets/images/camspaylogo.svg";

export default function ClientsSection() {
    const logos = [
        "https://cdn.builder.io/api/v1/image/assets%2F2267678df3644282aa24593b357b4ca2%2Fb148ff70afea41c9be7f8de2dbd7aee9?format=webp&width=800",
        "https://cdn.builder.io/api/v1/image/assets%2F2267678df3644282aa24593b357b4ca2%2F3bd2056d6a8c442a8aa1699de170a1ba?format=webp&width=800",
        "https://cdn.builder.io/api/v1/image/assets%2F2267678df3644282aa24593b357b4ca2%2F4575d02a18f94f56b5766301b38ddcfa?format=webp&width=800",
        "https://cdn.builder.io/api/v1/image/assets%2F2267678df3644282aa24593b357b4ca2%2Fc47d972a25bc4f20bf77fe0ff496cefa?format=webp&width=800",
        "https://cdn.builder.io/api/v1/image/assets%2F67df938acbe54ee0b44933787440b3b2%2F6e8f505de8a4457593019f7938b0cdc4?format=webp&width=800",
        "https://cdn.builder.io/api/v1/image/assets%2F2267678df3644282aa24593b357b4ca2%2F1626d4980a484a2ba75331b950dee58a?format=webp&width=800",
        Camspay
    ];

    return (
        <section id="clients" className="bg-white overflow-hidden ">
            <ScrollScale
                as="div"
                className="container mx-auto py-10 md:w-2/3 w-full"
                direction="right"
                fromScale={0.7}
                toScale={1}
                fromOpacity={0.12}
                toOpacity={1}
            >
                <h3 className="text-center text-sm font-semibold text-slate-700 mb-6">
                    Trusted By The Top Payment Aggregator & Gateways
                </h3>

                <div className="relative w-full overflow-hidden">
                    <style>{`
                        @keyframes scrollLeft {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .logo-track {
                            display: flex;
                            width: calc(200%); /* double width for seamless loop */
                            animation: scrollLeft 20s linear infinite;
                        }
                        .logo-item {
                            flex: 0 0 auto;
                            margin: 0 20px;
                            height: 50px;
                        }
                        .logo-item img {
                            height: 100%;
                            object-fit: contain;
                        }
                    `}</style>

                    <div className="logo-track ">
                        {/* Repeat logos twice for infinite loop */}
                        {[...logos, ...logos].map((logo, index) => (
                            <div key={index} className="logo-item">
                                <img src={typeof logo === "string" ? logo : logo} alt={`Logo ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollScale>
        </section>
    );
}
