import ScrollScale from "@/components/ui/scroll-scale";

import Investors1 from "@/pages/assets/certificates/77capital.jpg";
import Investors2 from "@/pages/assets/certificates/aa2_new.avif";
import Investors3 from "@/pages/assets/certificates/cdm.png";

// Certificates Images
import Certificate1 from "@/pages/assets/certificates/cc1.png";
import Certificate2 from "@/pages/assets/certificates/ServiceProviderBadge_1.png";
import Certificate3 from "@/pages/assets/certificates/cc2.png";
import Certificate4 from "@/pages/assets/certificates/iso.png";
import Certificate5 from "@/pages/assets/certificates/PCI_3DS.png";
import Certificate6 from "@/pages/assets/certificates/PCIDSS.png";
import Certificate7 from "@/pages/assets/certificates/sisa_s.png";


// Certificates PDFs (local)
import CertPdf1 from "@/pages/assets/pdf/gov.pdf";
import CertPdf2 from "@/pages/assets/pdf/list.pdf";
import CertPdf3 from "@/pages/assets/pdf/emvco.pdf";
import CertPdf4 from "@/pages/assets/pdf/iso.pdf";
import CertPdf5 from "@/pages/assets/pdf/sisa.pdf";

export default function Who() {
  const Investors = [
    {img : Investors1,
     pdf :"https://77.capital/"
    },
    {img : Investors2,
     pdf :"https://www.saisoncapital.com/portfolio"
    },
    {img : Investors3,
     pdf :"https://cdmcapital.in/"
    }
    ];

  const Certificates = [
    { img: Certificate1, pdf: CertPdf1 },
    { img: Certificate2, pdf: CertPdf2 },
    { img: Certificate3, pdf: CertPdf3 },
    { img: Certificate4, pdf: CertPdf4 },
    { img: Certificate5, pdf: CertPdf5 },
    { 
      img: Certificate6, 
      pdf: "https://seal.controlcase.com/index.php?page=showCert&cId=4174044739" // external link
    },
    { img: Certificate7, pdf: "https://www.sisainfosec.com/certificate.php?number=65293083357311337083&type=pcisthree" },
  ];

  return (
    <section id="who" className="bg-white">
      <ScrollScale
        as="div"
        className="container mx-auto py-12 md:py-16"
        direction="right"
        fromScale={0.7}
        toScale={1}
        fromOpacity={0.12}
        toOpacity={1}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Section */}
          <div className="flex flex-col justify-center text-center md:text-left px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Who We Are
            </h2>
            <p className="mt-3 text-base text-slate-700 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Mylapay is an emerging fintech startup (Minded Technologies &
              Services Pvt Ltd), focused on secure payments, tokenization, and
              intelligent routing. We partner with banks, PSPs and aggregators
              to deliver high performance payment infrastructure and fraud
              protection.
            </p>

            <div className="mt-6 flex flex-wrap justify-center md:justify-start items-center gap-6 text-sm text-slate-600">
              <div className="flex flex-col items-center md:items-start">
                <span>Founded</span>
                <span className="font-semibold">2019</span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span>Headquarters</span>
                <span className="font-semibold">Chennai</span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="#contact"
                className="inline-block rounded-md bg-[#202c5c] px-5 py-2 text-white font-medium hover:bg-[#192247]"
              >
                Contact Sales
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              {/* Certificates Section */}
              <div className="text-xs font-medium text-slate-700 mb-4">
                Certificates and Badges
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {Certificates.map((cert, i) => (
                  <a
                    key={i}
                    href={cert.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center min-h-[90px] rounded-lg bg-white/80 border border-slate-200 hover:shadow-md transition"
                  >
                    <img
                      src={cert.img}
                      alt={`Certificate ${i + 1}`}
                      className="h-16 w-16 object-contain"
                    />
                  </a>
                ))}
              </div>

              {/* Investors Section */}
              <div className="mt-8 text-xs font-medium text-slate-700 mb-4">
                Backed by Prominent Investors
              </div>
              <div className="grid grid-cols-3 gap-4">
                {Investors.map((invest, i) => (
                  <a
                    key={i}
                    className="flex items-center justify-center min-h-[90px] rounded-lg bg-white/80 border border-slate-200 hover:shadow-md transition"
                    href={invest.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={invest.img}
                      alt={`Investor ${i + 1}`}
                      className="h-16 w-24 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollScale>
    </section>
  );
}
