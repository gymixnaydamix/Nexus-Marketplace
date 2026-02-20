
import { Order, Product } from '../types';

/**
 * NexusOS Print Service
 * Generates manual hard-copy logistic manifests.
 */
export const PrintService = {
  generateOrderManifest: (order: Order, product?: Product) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <html>
        <head>
          <title>LOGISTIC_MANIFEST_${order.id}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
            body { 
              font-family: 'JetBrains Mono', monospace; 
              padding: 40px; 
              color: #000; 
              background: #fff;
              line-height: 1.4;
            }
            .header { 
              border-bottom: 4px solid #000; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
              display: flex; 
              justify-content: space-between; 
              align-items: flex-end;
            }
            .title { font-size: 24px; font-weight: 800; text-transform: uppercase; }
            .meta { font-size: 10px; text-transform: uppercase; opacity: 0.6; }
            .section { margin-bottom: 40px; }
            .label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #666; margin-bottom: 5px; }
            .value { font-size: 16px; font-weight: 700; text-transform: uppercase; }
            .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 20px; }
            .footer { border-top: 1px dashed #ccc; padding-top: 20px; font-size: 8px; text-align: center; }
            .barcode { height: 60px; background: #000; width: 100%; margin-top: 20px; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">Logistic Manifest</div>
              <div class="meta">Sequence: ${order.id} / World: ${order.world}</div>
            </div>
            <div style="text-align: right;">
              <div class="value">Nexus OS v2035</div>
              <div class="meta">${new Date(order.timestamp).toLocaleString()}</div>
            </div>
          </div>

          <div class="section">
            <div class="label">Deployment Target</div>
            <div class="value">${product?.title || 'UNKNOWN ASSET'}</div>
          </div>

          <div class="grid">
            <div class="section">
              <div class="label">Identity Link</div>
              <div class="value">BUYER_${order.buyerId}</div>
            </div>
            <div class="section">
              <div class="label">Fiscal Value</div>
              <div class="value">$${order.total.toLocaleString()} USD</div>
            </div>
          </div>

          <div class="section">
             <div class="label">Tracking Sequence</div>
             <div class="value">${order.trackingId || 'PENDING_ASSIGNMENT'}</div>
             <div class="barcode"></div>
          </div>

          <div class="section" style="margin-top: 60px; border: 2px solid #000; padding: 20px;">
             <div class="label">Manual Checksum Verification</div>
             <div style="height: 40px;"></div>
             <div style="border-top: 1px solid #000; width: 200px; margin-top: 20px;">
               <div class="meta">Authorized Controller Signature</div>
             </div>
          </div>

          <div class="footer">
            IMMUTABLE LEDGER RECORD • REPLICATION PROHIBITED • NEXUS KERNEL ENFORCED
          </div>

          <script>
            window.onload = () => {
              window.print();
              // window.close();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  }
};
