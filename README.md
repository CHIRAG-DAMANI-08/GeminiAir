# 🌟 GeminiAir Travel Dashboard 🛫

Welcome to GeminiAir, your ultimate travel companion application! This Next.js-based dashboard provides real-time weather updates, travel inspiration, immersive 3D destination previews, and much more to enhance your travel experience.

## 🚀 Features

- 🏠 Responsive dashboard layout
- 🌤️ Real-time weather information based on user location
- 🛫 Real-time flight information and tracking with AviationStack API
- ⏱️ Weather-based flight schedule prediction (in development, pending due to budget constraints)
- 💡 Inspirational travel quotes
- ✈️ Interesting travel facts
- 🏖️ 3D previews of beach, mountain, and forest destinations
- 🎖️ Loyalty programs to reward and retain frequent travelers
- 🚨 Disruption management and predictive flight delay alerts
- 🤖 AI-powered chat assistant for travel queries
- 📈 AI-based analytics for continuous improvement of travel services
- 📱 Seamless usage across all devices for a consistent experience

## 🛠️ Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Axios for API requests
- Three.js for 3D rendering
- OpenWeatherMap API for weather data
- AviationStack API for flight tracking
- **Gemini API** for additional data services

## 📁 Project Structure

```
/
├── app/
│ ├── 3d-view/
│ │ └── [model]/
│ │ └── page.tsx
│ ├── bookings/
│ │ └── page.tsx
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── dashboard.tsx
│ └── ui/
│ ├── button.tsx
│ └── card.tsx
├── public/
│ ├── images/
│ │ ├── beach-preview.jpg
│ │ ├── mountain-preview.jpg
│ │ └── forest-preview.jpg
│ └── models/
│ ├── beach.glb
│ ├── mountain.glb
│ └── forest.glb
├── .env.local
├── next.config.mjs
├── package.json
└── README.md


```
## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/geminiair.git
   ```

2. Install dependencies:
   ```bash
   cd geminiair
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap , Gemini and AviationStack API keys:
   ```bash
   AVIATIONSTACK_API_KEY
   GEMINI_API_KEY
   NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📄 Key Files

- `app/page.tsx`: Main dashboard component with weather, quotes, and travel facts
- `app/api/chat`: Api route for GEMINI API calls.
- `app/api/flights`: Api route for AviationStack API calls.
- `app/api/insights`: Api route for Insight information API calls.
- `\app\loyalty-program`: Main page to sign up for LoyaltyPrograms
- `app/3d-view/[model]/page.tsx`: Dynamic route for 3D model viewer
- `components/dashboard.tsx`: Layout component for the dashboard
- `components/ui/`: Reusable UI components


## 🌐 API Integration

- **OpenWeatherMap API**: Fetches real-time weather data.
- **AviationStack API**: Provides real-time flight information and tracking. Ensure you have valid API keys.
- **Gemini API**: Additional data and analytics for enhanced insights and services.

## 🎨 3D Models

The application showcases 3D models of beach, mountain, and forest scenes. These models are stored as GLB files in the `public/models/` directory and are rendered using Three.js.

## 🤖 AI Chat Assistant

The dashboard includes an AI-powered chat assistant to help users with travel-related queries. This feature uses a simulated AI response for demonstration purposes.

## 📈 AI-Based Analytics

To improve service over time, GeminiAir uses AI to analyze travel patterns, customer feedback, and operational data for continuous improvement, providing an evolving user experience.

## 📱 Responsive Design

The dashboard is fully responsive and adapts to various screen sizes, providing an optimal viewing experience on both desktop and mobile devices.

## 🛠️ Customization

Feel free to customize the dashboard by adding new features, modifying the UI, or integrating additional APIs to enhance the travel experience.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/geminiair/issues) if you want to contribute.

## 📜 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

---

Happy traveling with GeminiAir! 🌴✈️🏔️
