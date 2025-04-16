"use client";

import PrivateContainer from "@/components/hoc/PrivateContainer";
import { Button } from "@/components/ui/button";
import CardsList from "@/components/page-components/payment-methods/CardsList";
import { useState } from "react";
import AddCardDialog from "@/components/page-components/payment-methods/AddCardDialog";
import StripElementWrapper from "@/components/common/StripElementWrapper";

const page = () => {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  return (
    <PrivateContainer className="pb-80">
      <div className="p-6 space-y-6 bg-white ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold" />
          <Button
            onClick={() => setShowAddCardModal(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xs"
          >
            Add Card
          </Button>
        </div>

        <CardsList />
      </div>
      <StripElementWrapper>
        <AddCardDialog open={showAddCardModal} onClose={() => setShowAddCardModal(false)} />
      </StripElementWrapper>
    </PrivateContainer>
  );
};

export default page;
