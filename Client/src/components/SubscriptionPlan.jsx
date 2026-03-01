import { PricingTable } from "@clerk/clerk-react"

const SubscriptionPlan = () => {
  return (
    <>
    <div className="px-4 sm:px-20 xl:px-32 my-24 ">
    <div className="text-center">
        <h2 className="text-slate-700 text-[42px] mx-auto font-semibold"> Choose Your Plan
</h2>
        <p className="text-gray-600 max-w-lg mx-auto trackin    g-tighter md:tracking-normal  ">Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
    </div>
    <div className="mt-12 max-w-2xl mx-auto">
<PricingTable/>
    </div>
    </div>
    </>
  )
}

export default SubscriptionPlan