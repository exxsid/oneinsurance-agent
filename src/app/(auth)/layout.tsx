'use client'

import Image from 'next/image'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Image
        className=""
        src="/images/agent-auth-bg.png"
        alt="bg"
        fill
        style={{ objectFit: 'cover' }}
      />

      {/* Dark overlay to make background darker */}
      <div className="absolute inset-0 z-5 bg-black/50"></div>

      <div className="relative z-10 grid w-full lg:grid-cols-2">
        <div className="relative flex h-screen w-full flex-col">
          <div className="flex h-full w-full items-center justify-center p-10">
            <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-10">
              <div className="flex justify-between">
                <Image
                  src="/images/logo.png"
                  alt="Company Logo"
                  width={150}
                  height={100}
                  className="object-contain"
                />
                <Image
                  src="/images/IFRC.png"
                  alt="IFRC Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
