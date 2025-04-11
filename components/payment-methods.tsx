export function PaymentMethods({ title, cryptoLabel }: { title: string; cryptoLabel: string }) {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-primary font-display mb-8">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-3 md:p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          <img
            src="/images/pix-logo.png"
            alt="PIX"
            className="h-8 md:h-12 w-auto mb-2"
            loading="lazy"
          />
          <span className="text-foreground font-semibold text-sm">PIX</span>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 md:p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png"
            alt="Binance"
            className="h-8 md:h-12 w-auto mb-2"
            loading="lazy"
          />
          <span className="text-foreground font-semibold text-sm">{cryptoLabel}</span>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 md:p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          <svg className="h-8 md:h-12 w-auto mb-2" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"
              fill="#635BFF"
            />
          </svg>
          <span className="text-foreground font-semibold text-sm">Stripe</span>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 md:p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          <svg className="h-8 md:h-12 w-auto mb-2" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.5 0.5L15.2 15.5H11.8L15.1 0.5H18.5ZM32.8 10.1L34.6 4.8L35.7 10.1H32.8ZM36.6 15.5H39.8L37 0.5H34.1C33.4 0.5 32.8 0.9 32.5 1.5L27.1 15.5H30.9L31.7 13.3H36.2L36.6 15.5ZM26.1 10.4C26.1 6.8 21.4 6.6 21.4 5C21.4 4.5 21.9 3.9 23 3.8C23.5 3.8 24.8 3.9 26.2 4.6L26.8 1.5C25.9 1.2 24.8 0.9 23.5 0.9C20 0.9 17.5 2.8 17.5 5.5C17.5 7.5 19.3 8.6 20.6 9.3C22 10 22.5 10.5 22.5 11.1C22.5 12.1 21.3 12.5 20.2 12.5C18.5 12.5 17.6 12.2 16.2 11.6L15.6 14.8C16.5 15.2 18.2 15.6 19.9 15.6C23.7 15.6 26.1 13.7 26.1 10.4ZM13.1 0.5L7.5 15.5H3.7L1 3.2C0.9 2.7 0.7 2.4 0.3 2.2C-0.4 1.8 -1.5 1.4 -2.5 1.2L-2.4 0.5H3.8C4.6 0.5 5.3 1.1 5.5 2L6.9 9.8L10.3 0.5H13.1Z"
              fill="#1434CB"
              transform="translate(10, 0)"
            />
          </svg>
          <span className="text-foreground font-semibold text-sm">Visa</span>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 md:p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          <svg className="h-8 md:h-12 w-auto mb-2" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="16" r="14" fill="#EB001B" />
            <circle cx="30" cy="16" r="14" fill="#F79E1B" />
            <path
              d="M24 6.5C21.5 8.5 20 11.5 20 16C20 20.5 21.5 23.5 24 25.5C26.5 23.5 28 20.5 28 16C28 11.5 26.5 8.5 24 6.5Z"
              fill="#FF5F00"
            />
          </svg>
          <span className="text-foreground font-semibold text-sm">Mastercard</span>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 md:p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          <svg className="h-8 md:h-12 w-auto mb-2" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="32" rx="3" fill="#006FCF" />
            <text x="6" y="14" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial, sans-serif">
              AMERICAN
            </text>
            <text x="6" y="24" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial, sans-serif">
              EXPRESS
            </text>
          </svg>
          <span className="text-foreground font-semibold text-sm">Amex</span>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 md:p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          <svg className="h-8 md:h-12 w-auto mb-2" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="32" rx="3" fill="white" />
            <circle cx="16" cy="16" r="12" fill="none" stroke="#0079BE" strokeWidth="2" />
            <circle cx="32" cy="16" r="12" fill="none" stroke="#0079BE" strokeWidth="2" />
            <path
              d="M16 4C9.4 4 4 9.4 4 16C4 22.6 9.4 28 16 28V4ZM32 4V28C38.6 28 44 22.6 44 16C44 9.4 38.6 4 32 4Z"
              fill="#0079BE"
            />
          </svg>
          <span className="text-foreground font-semibold text-sm">Diners</span>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 md:p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          <svg className="h-8 md:h-12 w-auto mb-2" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.3 9.7V15H20.5V1H25.2C26.5 1 27.6 1.4 28.5 2.3C29.4 3.2 29.8 4.3 29.8 5.6C29.8 6.9 29.4 8 28.5 8.9C27.6 9.8 26.5 10.2 25.2 10.2L22.3 9.7ZM22.3 2.7V8.5H25.2C26 8.5 26.7 8.2 27.2 7.7C27.7 7.2 28 6.5 28 5.6C28 4.7 27.7 4 27.2 3.5C26.7 3 26 2.7 25.2 2.7H22.3Z"
              fill="#5F6368"
            />
            <path
              d="M34.8 6.5C36.3 6.5 37.5 6.9 38.3 7.8C39.1 8.7 39.5 9.8 39.5 11.3V15H37.8V13.6H37.7C37 14.6 36 15.1 34.7 15.1C33.6 15.1 32.7 14.8 32 14.2C31.3 13.6 30.9 12.8 30.9 11.9C30.9 10.9 31.3 10.1 32 9.6C32.7 9.1 33.7 8.8 35 8.8C36.1 8.8 37 9 37.7 9.3V8.9C37.7 8.3 37.5 7.8 37 7.4C36.5 7 36 6.8 35.3 6.8C34.3 6.8 33.5 7.2 32.9 8L31.4 7C32.3 5.9 33.4 5.4 34.8 5.4V6.5ZM32.7 11.9C32.7 12.4 32.9 12.8 33.3 13.1C33.7 13.4 34.2 13.6 34.8 13.6C35.6 13.6 36.3 13.3 36.9 12.8C37.5 12.3 37.8 11.7 37.8 11C37.2 10.6 36.4 10.4 35.4 10.4C34.7 10.4 34.1 10.6 33.7 10.9C33.3 11.2 33.1 11.5 33.1 11.9H32.7Z"
              fill="#5F6368"
            />
            <path d="M47.5 6.7L41.8 19.5H40L42.4 14.5L38.5 6.7H40.4L43.3 12.8H43.4L46.2 6.7H47.5Z" fill="#5F6368" />
            <path
              d="M16.2 8.5C16.2 8.1 16.2 7.7 16.1 7.3H8.5V9.6H12.8C12.7 10.3 12.3 11 11.7 11.4V13H14C15.4 11.7 16.2 9.8 16.2 8.5Z"
              fill="#4285F4"
            />
            <path
              d="M8.5 14.5C10.5 14.5 12.2 13.8 13.5 12.7L11.2 11.1C10.6 11.5 9.8 11.7 8.5 11.7C6.6 11.7 5 10.4 4.4 8.7H2V10.3C3.3 12.9 5.7 14.5 8.5 14.5Z"
              fill="#34A853"
            />
            <path d="M4.4 8.7C4.1 7.9 4.1 7.1 4.4 6.3V4.7H2C1.1 6.5 1.1 8.5 2 10.3L4.4 8.7Z" fill="#FBBC04" />
            <path
              d="M8.5 4.3C9.9 4.3 11.2 4.8 12.2 5.7L14.2 3.7C12.7 2.3 10.7 1.5 8.5 1.5C5.7 1.5 3.3 3.1 2 5.7L4.4 7.3C5 5.6 6.6 4.3 8.5 4.3Z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-foreground font-semibold text-sm">Google Pay</span>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 md:p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          <svg className="h-8 md:h-12 w-auto mb-2" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g fill="currentColor">
              <path d="M8.5 3.5C9.2 2.6 9.7 1.4 9.5 0.2C8.4 0.3 7.1 0.9 6.3 1.8C5.6 2.6 5 3.8 5.2 5C6.4 5.1 7.7 4.5 8.5 3.5Z" />
              <path d="M9.5 5.3C7.5 5.2 5.8 6.5 4.9 6.5C4 6.5 2.6 5.4 1 5.4C-0.2 5.4 -1.3 6 -2 7.1C-3.3 9.2 -2.3 12.4 -0.9 14.2C-0.2 15.1 0.6 16.1 1.6 16.1C2.2 16.1 2.5 15.7 3.5 15.7C4.5 15.7 4.8 16.1 5.8 16.1C6.8 16.1 7.5 15.2 8.2 14.3C9 13.3 9.3 12.4 9.3 12.3C9.3 12.3 7.5 11.6 7.5 9.5C7.5 7.7 9 6.8 9.1 6.8C8.1 5.4 6.6 5.3 6.2 5.3C7.5 5.3 8.9 6.2 9.5 5.3Z" />
            </g>
            <text
              x="14"
              y="13"
              fill="currentColor"
              fontSize="10"
              fontWeight="400"
              fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
            >
              Pay
            </text>
          </svg>
          <span className="text-foreground font-semibold text-sm">Apple Pay</span>
        </div>

        <div className="bg-card border border-border rounded-xl p-3 md:p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          <svg className="h-8 md:h-12 w-auto mb-2" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="24" rx="6" fill="#00D66F" />
            <circle cx="12" cy="12" r="4.5" fill="white" opacity="0.9" />
            <circle cx="20" cy="12" r="4.5" fill="white" opacity="0.9" />
            <path d="M12 7.5C8.4 7.5 5.5 10.4 5.5 14C5.5 17.6 8.4 20.5 12 20.5V7.5Z" fill="white" />
            <path d="M20 7.5V20.5C23.6 20.5 26.5 17.6 26.5 14C26.5 10.4 23.6 7.5 20 7.5Z" fill="white" />
          </svg>
          <span className="text-foreground font-semibold text-sm">Link</span>
        </div>
      </div>
    </div>
  )
}
