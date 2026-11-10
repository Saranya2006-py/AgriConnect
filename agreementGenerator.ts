import { format } from 'date-fns';

interface AgreementDetails {
  farmerName: string;
  farmerLocation: string;
  buyerName: string;
  buyerLocation: string;
  cropName: string;
  quantity: number;
  pricePerKg: number;
  expectedSupplyDate: string;
}

export function generateAgreementText(details: AgreementDetails): string {
  const today = format(new Date(), 'MMMM d, yyyy');
  const supplyDate = format(new Date(details.expectedSupplyDate), 'MMMM d, yyyy');
  
  return `This Crop Supply and Failure Management Agreement is made on ${today}, between Farmer ${details.farmerName}, residing at ${details.farmerLocation}, and Buyer ${details.buyerName}, located at ${details.buyerLocation}. Under this agreement, the Farmer agrees to supply ${details.quantity.toLocaleString()} kg of ${details.cropName.toLowerCase()} at a rate of ₹${details.pricePerKg} per kg, ensuring the produce meets the agreed quality and industry standards. Deliveries will be made to the Buyer's warehouse by ${supplyDate}, with payment due within 7 days of delivery. In case of crop failure due to unforeseen circumstances such as drought, pest infestation, or disease, the Farmer shall notify the Buyer within 48 hours, and both parties will jointly assess the loss to determine compensation, replacement, or alternative arrangements. The risk of loss remains with the Farmer until the crops are delivered to the Buyer. Any disputes arising from this agreement shall be resolved through mutual negotiation or arbitration under local jurisdiction.`;
}

export function generateAgreementId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `AGR-${year}${month}-${random}`;
}
