-- Update the payment-receipts bucket to be public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'payment-receipts';

-- Create policies to allow public uploads to payment-receipts bucket
CREATE POLICY "Allow public uploads to payment-receipts" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'payment-receipts');

CREATE POLICY "Allow public access to payment-receipts" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'payment-receipts');