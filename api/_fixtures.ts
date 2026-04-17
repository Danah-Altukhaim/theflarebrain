// Auto-generated fixture data dumped from the local Postgres seed.
// This is a static snapshot for the Vercel demo deploy; writes do not
// persist. Regenerate by re-running the dump script in scripts/.

export const MODULES = [
  {
    "id": "5709042f-40bd-4ad9-882d-cb301b94e7ba",
    "slug": "branches",
    "label": "Branches & Hours",
    "icon": "map-pin",
    "fieldDefinitions": [
      {
        "key": "name",
        "type": "text",
        "label": "Name",
        "required": true,
        "localized": true
      },
      {
        "key": "governorate",
        "type": "select",
        "label": "Governorate",
        "options": [
          "Hawalli",
          "Jahra",
          "Ahmadi",
          "Farwaniya",
          "Al-Asimah"
        ],
        "required": true,
        "localized": false
      },
      {
        "key": "status",
        "type": "select",
        "label": "Status",
        "options": [
          "Active",
          "CLOSED",
          "Temp Closed"
        ],
        "required": true,
        "localized": false
      },
      {
        "key": "google_maps_url",
        "type": "url",
        "label": "Maps",
        "required": false,
        "localized": false
      },
      {
        "key": "hours_regular",
        "type": "textarea",
        "label": "Hours",
        "required": true,
        "localized": false
      },
      {
        "key": "hours_ramadan",
        "type": "textarea",
        "label": "Ramadan hours",
        "required": false,
        "localized": false
      }
    ]
  },
  {
    "id": "14126df4-e36c-451e-a448-d5206c06eff0",
    "slug": "escalation_rules",
    "label": "Escalation Rules",
    "icon": "alert-triangle",
    "fieldDefinitions": [
      {
        "key": "trigger",
        "type": "textarea",
        "label": "Trigger",
        "required": true,
        "localized": false
      },
      {
        "key": "channel",
        "type": "select",
        "label": "Channel",
        "options": [
          "human_chat",
          "phone",
          "email",
          "whatsapp"
        ],
        "required": true,
        "localized": false
      },
      {
        "key": "webhook_url",
        "type": "url",
        "label": "Webhook",
        "required": false,
        "localized": false
      }
    ]
  },
  {
    "id": "2eeb15ca-2aec-46ad-b680-bfff2e5cd5b3",
    "slug": "faqs",
    "label": "FAQs (EN + AR)",
    "icon": "help-circle",
    "fieldDefinitions": [
      {
        "key": "question",
        "type": "text",
        "label": "Question",
        "required": true,
        "localized": true
      },
      {
        "key": "answer",
        "type": "textarea",
        "label": "Answer",
        "required": true,
        "localized": true
      },
      {
        "key": "category",
        "type": "text",
        "label": "Category",
        "required": false,
        "localized": false
      }
    ]
  },
  {
    "id": "ee8f4713-d157-47e6-848a-9757ad82a1cb",
    "slug": "intents",
    "label": "Intent Library",
    "icon": "target",
    "fieldDefinitions": [
      {
        "key": "intent_id",
        "type": "text",
        "label": "Intent ID",
        "required": true,
        "localized": false
      },
      {
        "key": "name",
        "type": "text",
        "label": "Name",
        "required": true,
        "localized": false
      },
      {
        "key": "description",
        "type": "textarea",
        "label": "Description",
        "required": false,
        "localized": false
      },
      {
        "key": "template_ref",
        "type": "text",
        "label": "Template Ref",
        "required": false,
        "localized": false
      },
      {
        "key": "requires_crm",
        "type": "boolean",
        "label": "Requires CRM",
        "required": false,
        "localized": false
      },
      {
        "key": "escalation_check",
        "type": "boolean",
        "label": "Escalation Check",
        "required": false,
        "localized": false
      },
      {
        "key": "revenue_opportunity",
        "type": "boolean",
        "label": "Revenue Opportunity",
        "required": false,
        "localized": false
      }
    ]
  },
  {
    "id": "b265f169-81ec-451c-9b38-ca26e4d28dd9",
    "slug": "partners",
    "label": "Partners & Discounts",
    "icon": "handshake",
    "fieldDefinitions": [
      {
        "key": "name",
        "type": "text",
        "label": "Name",
        "required": true,
        "localized": false
      },
      {
        "key": "type",
        "type": "select",
        "label": "Type",
        "options": [
          "Bank",
          "Loyalty",
          "Corporate",
          "Other"
        ],
        "required": true,
        "localized": false
      },
      {
        "key": "notes",
        "type": "textarea",
        "label": "Notes",
        "required": false,
        "localized": true
      }
    ]
  },
  {
    "id": "ed196f30-c108-4935-b3b9-5755ba64cc1b",
    "slug": "policy_matrix",
    "label": "Policies & Rules",
    "icon": "shield",
    "fieldDefinitions": [
      {
        "key": "scenario",
        "type": "text",
        "label": "Scenario",
        "required": true,
        "localized": true
      },
      {
        "key": "policy",
        "type": "textarea",
        "label": "Policy",
        "required": true,
        "localized": true
      },
      {
        "key": "exception",
        "type": "textarea",
        "label": "Exception",
        "required": false,
        "localized": true
      }
    ]
  },
  {
    "id": "ffebff5c-c9ef-4143-9489-a50b52f7e0a2",
    "slug": "promotions",
    "label": "Active Offers",
    "icon": "tag",
    "fieldDefinitions": [
      {
        "key": "name",
        "type": "text",
        "label": "Name",
        "required": true,
        "localized": false
      },
      {
        "key": "type",
        "type": "select",
        "label": "Type",
        "options": [
          "Promo",
          "Seasonal",
          "Bank",
          "Update",
          "Ops"
        ],
        "required": true,
        "localized": false
      },
      {
        "key": "message",
        "type": "textarea",
        "label": "Customer message",
        "required": true,
        "localized": true
      },
      {
        "key": "start_date",
        "type": "date",
        "label": "Start",
        "required": false,
        "localized": false
      },
      {
        "key": "end_date",
        "type": "date",
        "label": "End",
        "required": false,
        "localized": false
      }
    ]
  }
] as const;

export const ENTRIES_BY_SLUG: Record<string, Array<{
  id: string;
  data: Record<string, unknown>;
  status: string;
  updatedAt: string;
}>> = {
  "branches": [
    {
      "id": "911a5f6d-4600-4625-bc63-508777a7dc04",
      "data": {
        "status": "Active",
        "name_ar": "مجمع الأفنيوز",
        "name_en": "The Avenues Mall",
        "governorate": "Farwaniya",
        "hours_ramadan": "Daily: 10AM-2AM",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/avenues"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "e2bb7e0f-9c55-4e6d-928e-9ddec83b6ab1",
      "data": {
        "status": "Active",
        "name_ar": "مجمع 360",
        "name_en": "360 Mall",
        "governorate": "Hawalli",
        "hours_ramadan": "Daily: 10AM-1AM",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/360mall"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "ec523444-a172-413a-91d1-22cc47bbcad8",
      "data": {
        "status": "Active",
        "name_ar": "مجمع الكوت",
        "name_en": "Al Kout Mall",
        "governorate": "Ahmadi",
        "hours_ramadan": "Daily: 10AM-1AM",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/alkout"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "ceeaf2e1-85f1-4fb7-82f0-1f35c2adcb38",
      "data": {
        "status": "Active",
        "name_ar": "مجمع المارينا",
        "name_en": "Marina Mall",
        "governorate": "Ahmadi",
        "hours_ramadan": "Daily: 10AM-1AM",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/marina"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "a524a654-c07a-4119-9a21-d4dd35dda553",
      "data": {
        "status": "Active",
        "name_ar": "مجمع ذا غيت",
        "name_en": "The Gate Mall",
        "governorate": "Farwaniya",
        "hours_ramadan": "Daily: 10AM-1AM",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/gatemall"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "9b17ce2f-e111-436c-9952-9a007473f61c",
      "data": {
        "status": "Active",
        "name_ar": "مجمع العاصمة",
        "name_en": "Assima Mall",
        "governorate": "Al-Asimah",
        "hours_ramadan": "Daily: 10AM-1AM",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/assima"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "c33b6849-925f-4cfe-81a2-0485d80acd6e",
      "data": {
        "status": "Active",
        "name_ar": "مجمع المروج",
        "name_en": "Murooj Complex",
        "governorate": "Farwaniya",
        "hours_ramadan": "Daily: 10AM-12AM",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/murooj"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "9c4c312d-355e-40cd-a93d-8056d95c8cfe",
      "data": {
        "status": "Active",
        "name_ar": "فرع الجهراء",
        "name_en": "Jahra Branch",
        "governorate": "Jahra",
        "hours_ramadan": "Daily: 10AM-12AM",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/jahra"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "79b189a1-6ca6-42b9-a7e0-bd75b0368543",
      "data": {
        "status": "Active",
        "name_ar": "منتجع صحارى للجولف",
        "name_en": "Sahara Golf Resort",
        "governorate": "Ahmadi",
        "hours_ramadan": "Daily: 3PM-12AM",
        "hours_regular": "Daily: 2PM-10PM\nFriday: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/sahara"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "997c3e6d-5cb4-421b-8973-7bd9fe789a29",
      "data": {
        "status": "Active",
        "name_ar": "مطار الكويت الدولي (صالة 4)",
        "name_en": "Kuwait International Airport (T4)",
        "governorate": "Farwaniya",
        "hours_ramadan": "Daily: 24 hours",
        "hours_regular": "Daily: 24 hours",
        "google_maps_url": "https://maps.app.goo.gl/kwiairport"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "d90d6bb5-a5aa-4bf9-b22e-3e78396ec0c0",
      "data": {
        "status": "Active",
        "name_ar": "مجمع الفنار",
        "name_en": "Al Fanar Mall",
        "governorate": "Hawalli",
        "hours_ramadan": "Daily: 10AM-1AM",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/alfanar"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "4c162963-2247-4aca-bad0-3e272a13370a",
      "data": {
        "status": "Temp Closed",
        "name_ar": "مجمع ديسكفري",
        "name_en": "Discovery Mall",
        "governorate": "Hawalli",
        "hours_ramadan": "",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/discovery"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "1b8c0568-fc65-4d8b-9315-60602114128a",
      "data": {
        "status": "Active",
        "name_ar": "فرع السالمية",
        "name_en": "Salmiya Branch",
        "governorate": "Hawalli",
        "hours_ramadan": "Daily: 10AM-1AM",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/salmiya"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "b2d50f57-7e96-4f23-a3a1-660a15894749",
      "data": {
        "status": "Active",
        "name_ar": "مجمع أوتاد",
        "name_en": "Awtad Mall",
        "governorate": "Jahra",
        "hours_ramadan": "Daily: 10AM-12AM",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/awtad"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    },
    {
      "id": "bd2f6ca6-5e9a-4135-b8ef-03d7360c4c7b",
      "data": {
        "status": "Active",
        "name_ar": "فرع أبو حليفة",
        "name_en": "Abu Halifa Branch",
        "governorate": "Ahmadi",
        "hours_ramadan": "Daily: 10AM-12AM",
        "hours_regular": "Sun-Wed: 10AM-10PM\nThu-Sat: 10AM-11PM",
        "google_maps_url": "https://maps.app.goo.gl/abuhalifa"
      },
      "status": "active",
      "updatedAt": "2026-04-16T06:18:13.061Z"
    }
  ],
  "escalation_rules": [
    {
      "id": "1f317acf-7a25-434c-b395-9235edf083f7",
      "data": {
        "channel": "human_chat",
        "trigger": "Complaint - angry, upset, not working, broken. Escalate to Branch Manager. SLA: 2 hours. Auto: We're sorry for the inconvenience. Connecting you to a team member now.",
        "webhook_url": ""
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:33:33.698Z"
    },
    {
      "id": "39586ccf-79d6-41c5-af18-f48d9b2c74e2",
      "data": {
        "channel": "human_chat",
        "trigger": "Refund Request - refund, money back, charge. Escalate to Finance/CRM. SLA: 4 hours. Auto: Let me connect you with our team to assist with your refund request.",
        "webhook_url": ""
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:33:33.698Z"
    },
    {
      "id": "2fb89dee-33f0-4220-9fc5-8c61201dab5c",
      "data": {
        "channel": "human_chat",
        "trigger": "Safety / Injury - hurt, injured, accident, emergency. Escalate to Operations Manager. SLA: 30 min. Auto: Your safety is our priority. Connecting you immediately.",
        "webhook_url": ""
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:33:33.698Z"
    },
    {
      "id": "12cedcd6-9f7d-44b1-93b1-b3ebc081258d",
      "data": {
        "channel": "human_chat",
        "trigger": "Lost Child - lost, can't find, missing child. Escalate to Branch Manager. SLA: 15 min. Auto: Please stay calm. Connecting you to branch manager immediately.",
        "webhook_url": ""
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:33:33.698Z"
    },
    {
      "id": "3eb31686-76f8-4dba-a695-ee92b056ec84",
      "data": {
        "channel": "human_chat",
        "trigger": "Technical Issue - website down, can't pay, error, app. Escalate to IT Support. SLA: 4 hours. Auto: We're aware of the issue and working on it. Apologies for the inconvenience.",
        "webhook_url": ""
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:33:33.698Z"
    },
    {
      "id": "71088e5d-624e-44a4-b657-d7f5e2b1c805",
      "data": {
        "channel": "whatsapp",
        "trigger": "General Inquiry - hours, location, prices, packages. Handled by PAIR AI. No escalation needed.",
        "webhook_url": ""
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:33:33.698Z"
    },
    {
      "id": "4162366e-4233-40c5-8962-62ff4c0e4de1",
      "data": {
        "channel": "human_chat",
        "trigger": "Group / School Booking - school trip, group, company event. Escalate to Sales Team. SLA: 24 hours. Auto: Connecting you to our group bookings team at Future Kid.",
        "webhook_url": ""
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:33:33.698Z"
    },
    {
      "id": "8a95779d-aeec-4202-9b8b-b22d4055d635",
      "data": {
        "channel": "human_chat",
        "trigger": "Lost Item - lost item, forgot, left behind, my bag, my phone. Escalate to Branch Manager. SLA: 2 hours. Auto: We understand how stressful that is. Connecting you to the Branch Manager.",
        "webhook_url": ""
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:33:33.698Z"
    }
  ],
  "faqs": [
    {
      "id": "737e0cee-f6dc-47a8-8697-5ee3b3d4ce2b",
      "data": {
        "category": "General Info",
        "answer_ar": "خلال رمضان، الفروع تشتغل على فترتين: صباحية (قبل الإفطار) ومسائية (بعد الإفطار). الأوقات تختلف حسب الفرع. رد باسم الفرع وأرسل لك المواعيد + الموقع.",
        "answer_en": "During Ramadan, branches operate in split shifts: morning (pre-Iftar) and evening (post-Iftar). Hours vary by branch. Reply with your branch name and I'll send you the exact timings + location pin.",
        "question_ar": "",
        "question_en": "What are the Ramadan branch hours?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "f2539b1e-723d-49be-9605-ca47b36ef1fb",
      "data": {
        "category": "Pricing / Promos",
        "answer_ar": "أغلب العوائل يختارون باقة 20 د.ك (32 رصيد) أو 50 د.ك (90 رصيد). مع خصم 50% على كل الألعاب، رصيدك يكمل ضعف!",
        "answer_en": "Most families go with the 20 KWD (->32 credit) or 50 KWD (->90 credit) packages. With 50% off all games, your credit lasts twice as long!",
        "question_ar": "",
        "question_en": "Which Ramadan top-up package is best?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "abe471e9-cdec-444c-bf93-0b721c046537",
      "data": {
        "category": "Birthday",
        "answer_ar": "نعم، يتطلب حجز حفلة عيد الميلاد دفع عربون لتأكيد الحجز.",
        "answer_en": "Yes, birthday party bookings require a deposit to confirm the reservation.",
        "question_ar": "",
        "question_en": "Does a birthday party booking require a deposit?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "edd78514-e9bb-4873-9021-bb96f39bf858",
      "data": {
        "category": "Pricing",
        "answer_ar": "لا، لا يوجد حد أدنى للشراء.",
        "answer_en": "No, there is no minimum purchase required.",
        "question_ar": "",
        "question_en": "Is there a minimum purchase required?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "9e3b38b4-febb-41b6-9543-b4d6107c9017",
      "data": {
        "category": "Pricing",
        "answer_ar": "نعم، قد توجد رسوم لبعض مناطق الأطفال في بعض الفروع.",
        "answer_en": "Yes, certain kids' areas may have an entry fee at selected branches.",
        "question_ar": "",
        "question_en": "Is there a fee for the kids' area?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "eccd856d-aab3-4d74-af4d-8ad4a17e1975",
      "data": {
        "category": "Pricing",
        "answer_ar": "الأسعار ثابتة بشكل عام، وقد تختلف بعض الأسعار حسب اللعبة أو الفرع.",
        "answer_en": "Prices are generally fixed but may vary by game or branch.",
        "question_ar": "",
        "question_en": "Are prices fixed?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "01617426-3533-425b-927c-ccff8f0eee5a",
      "data": {
        "category": "Pricing",
        "answer_ar": "تتوفر عروض وباقات خاصة.",
        "answer_en": "Game pricing is the same for all ages. Special packages and offers are available.",
        "question_ar": "",
        "question_en": "Do children get a special price?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "7ec99f34-ac17-4853-9a94-c609524b718c",
      "data": {
        "category": "Pricing",
        "answer_ar": "تختلف أسعار الألعاب حسب نوع اللعبة.",
        "answer_en": "Game prices vary depending on the type of game.",
        "question_ar": "",
        "question_en": "What is the price of games?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "55b2a3bd-466b-4e46-9001-2443fb2e06bb",
      "data": {
        "category": "Pricing / Promos",
        "answer_ar": "نعم، تتوفر باقات وعروض مميزة للعائلات حسب الفرع والموسم.",
        "answer_en": "Yes, family packages and special offers are available depending on the branch and season.",
        "question_ar": "",
        "question_en": "Are family packages available?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "ded35116-73fb-4423-86c1-d1d2c9e7b4a4",
      "data": {
        "category": "Food / Facilities",
        "answer_ar": "توجد مطاعم في بعض الفروع حسب موقع الفرع داخل المجمع.",
        "answer_en": "Some branches are located within malls that have restaurants nearby.",
        "question_ar": "",
        "question_en": "Are there restaurants inside the branches?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "53d74425-7b06-414d-bb21-16a6868f6b2b",
      "data": {
        "category": "General Info",
        "answer_ar": "تختلف ساعات العمل حسب الفرع والمجمع والموسم.",
        "answer_en": "Working hours may vary by branch, mall, and season.",
        "question_ar": "",
        "question_en": "What are the working hours?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "aeb28b3a-551d-49a0-8047-f09f1f65bc92",
      "data": {
        "category": "Facilities",
        "answer_ar": "جميع فروعنا توفر إمكانية الوصول إلى مواقف السيارات.",
        "answer_en": "All our branches have access to parking.",
        "question_ar": "",
        "question_en": "Is parking available at all branches?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "39026827-2e88-4a83-b1e2-34c9405fea68",
      "data": {
        "category": "Pricing / Promos",
        "answer_ar": "نعم! خلال رمضان 2026، جميع الألعاب (بما فيها ألعاب التذاكر) عليها خصم 50% طوال اليوم، طوال الشهر. رصيدك يلعبك دبل. باقات الشحن: 12->17 | 20->32 | 50->90 | 99->220.",
        "answer_en": "Yes! During Ramadan 2026, all games (including ticket games) are 50% off, all day, every day. Your play credit goes twice as far. Top-up packages: 12->17 | 20->32 | 50->90 | 99->220.",
        "question_ar": "",
        "question_en": "Is there a Ramadan promotion?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "a3cd8491-c30a-4e96-a5bb-b24d3ca3d1b2",
      "data": {
        "category": "Pricing / Promos",
        "answer_ar": "الخصم على الألعاب فقط. باقات الشحن مثل ما هي، لكن رصيدك يكمل أكثر لأن الألعاب عليها خصم 50%.",
        "answer_en": "The discount is on games only. Top-up packages stay the same, but your credit goes further because games are 50% off.",
        "question_ar": "",
        "question_en": "Does the Ramadan discount apply to recharge/top-up packages?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.354Z"
    },
    {
      "id": "ef51f5af-5ef1-49ef-9ec0-077b2a5e4423",
      "data": {
        "category": "Credit / Card",
        "answer_ar": "حالياً، يتم استخدام بطاقة فعلية لشحن الرصيد واللعب.",
        "answer_en": "Currently, a physical card is used to load credit and play.",
        "question_ar": "",
        "question_en": "Is the card digital?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "d5a13c3b-ee57-407b-81f2-dea7e05757b5",
      "data": {
        "category": "Birthday",
        "answer_ar": "نعم، تشمل باقة عيد الميلاد وجبات ومشروبات لكل طفل.",
        "answer_en": "Yes, the birthday package includes meals and drinks for each child.",
        "question_ar": "",
        "question_en": "Is food included in the birthday package?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "6970daeb-01fb-4361-8750-3055ac4d17e1",
      "data": {
        "category": "Birthday",
        "answer_ar": "نعم، تتوفر شخصيات كرتونية تضيف متعة وتفاعلًا خاصًا للحفلة.",
        "answer_en": "Yes, mascot characters are available to add extra excitement and interaction to the party.",
        "question_ar": "",
        "question_en": "Do you offer mascot characters for birthday parties?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "f334509f-7402-4b2e-9175-977f7874deb1",
      "data": {
        "category": "Trips / Admin",
        "answer_ar": "نعم، يمكن إصدار فاتورة رسمية باسم المدرسة أو الجهة.",
        "answer_en": "Yes, an official invoice can be issued in the name of the school or organization.",
        "question_ar": "",
        "question_en": "Can an official invoice be issued for schools or organizations?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "2126b4ff-1bb7-47c9-816a-881ce4aad964",
      "data": {
        "category": "Trips",
        "answer_ar": "نعم، الحجز المسبق مطلوب لتنظيم الرحلة بالشكل الأمثل.",
        "answer_en": "Yes, advance booking is required to ensure proper coordination.",
        "question_ar": "",
        "question_en": "Does the trip need to be booked in advance?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "a28fcf8d-74b8-4065-a941-efc244514f29",
      "data": {
        "category": "Trips",
        "answer_ar": "نعم، يمكن تخصيص برنامج الرحلة بما يتناسب مع أعمار الأطفال.",
        "answer_en": "Yes, the trip program can be customized according to the children's age group.",
        "question_ar": "",
        "question_en": "Can the trip program be customized by age group?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "196480a0-752f-4c9d-b430-2387fb6f2ae8",
      "data": {
        "category": "Trips",
        "answer_ar": "لا، لا تشمل برامج الرحلات الوجبات.",
        "answer_en": "No, meals are not included in trip programs.",
        "question_ar": "",
        "question_en": "Does the trip program include meals?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "c564d8c8-ee67-49b3-ade7-5e6903a96d2c",
      "data": {
        "category": "Trips",
        "answer_ar": "نعم، تشمل الرحلات ألعابًا جماعية وأنشطة مختارة.",
        "answer_en": "Yes, trip programs include group games and selected activities.",
        "question_ar": "",
        "question_en": "Does the trip program include games?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "1f4c5eb3-e0f6-46e1-863e-5820a16f976f",
      "data": {
        "category": "Trips / Pricing",
        "answer_ar": "نعم، تتوفر خصومات خاصة للمجموعات والمدارس.",
        "answer_en": "Yes, special group discounts are available for schools.",
        "question_ar": "",
        "question_en": "Are there special discounts for schools?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "c00bbd11-6dd1-470f-afce-e74049484388",
      "data": {
        "category": "Trips / Schools",
        "answer_ar": "تتراوح مدة الرحلة من ساعتين إلى ثلاث ساعات.",
        "answer_en": "Trip programs typically last between two and three hours.",
        "question_ar": "",
        "question_en": "What is the duration of the trip program?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "b7e918ac-668d-42c4-be5a-be0c453362f2",
      "data": {
        "category": "Trips / Schools",
        "answer_ar": "الحد الأدنى لعدد الطلاب هو 10 طلاب.",
        "answer_en": "The minimum number of students required is 10.",
        "question_ar": "",
        "question_en": "What is the minimum number of students required?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "5df4a11f-3ce5-412d-a355-7de76addbe86",
      "data": {
        "category": "Trips / Schools",
        "answer_ar": "نعم، نقدم برامج مخصصة للرحلات المدرسية.",
        "answer_en": "Yes, we offer dedicated programs designed specifically for school trips.",
        "question_ar": "",
        "question_en": "Do you offer dedicated school trip programs?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "b3ca15f7-7bf8-4846-a555-af27411d3a62",
      "data": {
        "category": "Membership / Loyalty",
        "answer_ar": "نعم، يتوفر برنامج ولاء يقدّم مزايا وعروض للمشتركين حسب استخدامهم.",
        "answer_en": "Yes, a loyalty program is available and offers benefits and promotions for members based on usage.",
        "question_ar": "",
        "question_en": "Is there a loyalty program?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "e25b3b3e-25d0-43e7-8018-8945900bbfff",
      "data": {
        "category": "Membership",
        "answer_ar": "نعم، يتم إعلام المشترك عند قرب انتهاء الاشتراك.",
        "answer_en": "Yes, members are notified when their membership is nearing expiration.",
        "question_ar": "",
        "question_en": "Will I be notified when my membership expires?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "74486b69-0291-4d4b-aaba-ce84cf76d4e1",
      "data": {
        "category": "Membership",
        "answer_ar": "اشتراكات طفل المستقبل مخصصة لاستخدام العائلة ولا يمكن مشاركتها مع الآخرين.",
        "answer_en": "Future Kid memberships are for family use and cannot be shared.",
        "question_ar": "",
        "question_en": "Can the membership be shared?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "b14a1600-203c-40f2-a725-58ff6c06675a",
      "data": {
        "category": "Birthday",
        "answer_ar": "تشمل باقة عيد الميلاد 15-25 طفلًا، بما فيهم طفل عيد الميلاد.",
        "answer_en": "The birthday package includes between 15-25 children, including the birthday child.",
        "question_ar": "",
        "question_en": "How many children are included in a birthday package?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "d5adc040-fbda-4bee-b11b-dbf29572c598",
      "data": {
        "category": "Payment",
        "answer_ar": "لا، لا تتوفر خدمة التقسيط حالياً.",
        "answer_en": "No, installment payment is not available.",
        "question_ar": "",
        "question_en": "Is installment payment available?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.284Z"
    },
    {
      "id": "e6563fd5-95aa-45f2-9c77-737e503f7b68",
      "data": {
        "category": "Membership",
        "answer_ar": "نعم، يتوفر اشتراك سنوي.",
        "answer_en": "Yes, an annual membership is available.",
        "question_ar": "",
        "question_en": "Is there an annual membership?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "38761c85-0184-4e24-913a-7bc4b364cfa1",
      "data": {
        "category": "Membership / Refunds",
        "answer_ar": "لا، لا يمكن استبدال أو استرجاع الاشتراك بعد التفعيل.",
        "answer_en": "Memberships cannot be exchanged or refunded once activated.",
        "question_ar": "",
        "question_en": "Can the membership be exchanged or refunded?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "781d5c49-ce93-452d-83d5-96d6026ba236",
      "data": {
        "category": "Membership / Birthday",
        "answer_ar": "نعم، يشمل الاشتراك خصومات على حفلات أعياد الميلاد في طفل المستقبل.",
        "answer_en": "Yes, the membership includes discounts on birthday parties at Future Kid.",
        "question_ar": "",
        "question_en": "Does the membership include birthday party discounts?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "dc42158e-576e-4c1f-a10d-882836a40f1a",
      "data": {
        "category": "Membership",
        "answer_ar": "الاشتراك متاح لجميع الأعمار.",
        "answer_en": "Memberships are suitable for all ages.",
        "question_ar": "",
        "question_en": "What is the suitable age for membership?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "d9370257-93b8-45f6-9f0e-79c4fa5dbd11",
      "data": {
        "category": "Membership",
        "answer_ar": "نعم، يحصل المشتركون على خصومات ومزايا حصرية.",
        "answer_en": "Yes, members enjoy exclusive discounts and benefits.",
        "question_ar": "",
        "question_en": "Are there discounts for members?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "97c62f43-81bd-4e6e-b1ff-94b0d1ded4d0",
      "data": {
        "category": "Membership",
        "answer_ar": "لا، الاشتراك غير قابل للتحويل.",
        "answer_en": "No, memberships are not transferable.",
        "question_ar": "",
        "question_en": "Is the membership transferable?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "ff3aed4e-c468-47a6-8539-a24f2684dd51",
      "data": {
        "category": "Membership",
        "answer_ar": "نعم، يشمل الاشتراك مزايا مرتبطة بالألعاب حسب نوع الاشتراك.",
        "answer_en": "Yes, memberships include game-related benefits depending on the plan.",
        "question_ar": "",
        "question_en": "Does the membership include games?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "a6ce8fde-57f8-4a7c-b417-dbd8f24c45d1",
      "data": {
        "category": "Membership",
        "answer_ar": "يمكن تجديد الاشتراك من خلال زيارة أقرب فرع.",
        "answer_en": "Memberships can be renewed by visiting the nearest branch.",
        "question_ar": "",
        "question_en": "How do I renew my membership?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "dde847d2-2897-4d32-b3a4-6301052e0f68",
      "data": {
        "category": "Membership",
        "answer_ar": "يتوفر حالياً نوع واحد من الاشتراكات ضمن برنامج الولاء.",
        "answer_en": "Currently, one type of membership is available under the loyalty program.",
        "question_ar": "",
        "question_en": "What types of memberships are available?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "10ee76a7-d6aa-424d-8e89-bfd30fde23b6",
      "data": {
        "category": "Membership",
        "answer_ar": "لا، يتوفر حالياً الاشتراك السنوي فقط.",
        "answer_en": "We only offer annual memberships at this time.",
        "question_ar": "",
        "question_en": "Are monthly memberships available?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "a6425024-8813-4e3c-b21e-5c78c083fd50",
      "data": {
        "category": "Refunds",
        "answer_ar": "لا، لا يمكن استرجاع الرصيد بعد الشحن.",
        "answer_en": "Loaded credit cannot be refunded.",
        "question_ar": "",
        "question_en": "Can the balance be refunded?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "525b8a95-f19f-4dee-90cb-4d8a20a17498",
      "data": {
        "category": "Credit / Card",
        "answer_ar": "نعم، يمكن شحن الرصيد مسبقاً.",
        "answer_en": "Yes, credit can be purchased in advance.",
        "question_ar": "",
        "question_en": "Can credit be purchased in advance?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "77885017-da47-4d9c-b7d6-20fbb0658558",
      "data": {
        "category": "Credit / Card",
        "answer_ar": "يمكن استخدام الرصيد في فروع طفل المستقبل.",
        "answer_en": "Credit can be used at all Future Kid branches.",
        "question_ar": "",
        "question_en": "Can credit be used at all branches?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "8bd1388e-c691-4359-a581-5bd12ab24e7c",
      "data": {
        "category": "Facilities",
        "answer_ar": "نعم، يُسمح بدخول عربات الأطفال داخل الفروع، باستثناء مناطق الألعاب.",
        "answer_en": "Yes, strollers are allowed inside the branches, except within the play areas and on rides.",
        "question_ar": "",
        "question_en": "Are strollers allowed?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "726b88de-7ba4-4efa-b750-a791f2df6863",
      "data": {
        "category": "Payment / Admin",
        "answer_ar": "نعم، يمكن الحصول على إيصال أو فاتورة من الفرع عند الدفع.",
        "answer_en": "Yes, a receipt or invoice can be provided at the branch upon payment or online once the customer checks out.",
        "question_ar": "",
        "question_en": "Can I get an invoice or receipt?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "884fb008-0bfb-46c4-9a67-df90ee4179bb",
      "data": {
        "category": "Birthday",
        "answer_ar": "نعم، يمكن إضافة أطفال مقابل رسوم إضافية، حسب نوع بطاقة اللعب المختارة.",
        "answer_en": "Yes, additional children can be added for an extra fee, depending on the selected play card.",
        "question_ar": "",
        "question_en": "Can I add extra children to a birthday party?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "0b931286-90b4-4948-92bd-37d8b7a0f601",
      "data": {
        "category": "Trips / Groups",
        "answer_ar": "نعم، يمكن تنظيم رحلات خاصة للشركات والمجموعات العائلية الكبيرة.",
        "answer_en": "Yes, trips can be arranged for companies and large family groups.",
        "question_ar": "",
        "question_en": "Can trips be organized for companies or large family groups?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.214Z"
    },
    {
      "id": "3e8e4353-9c8e-4529-bffb-765da72ee3ef",
      "data": {
        "category": "General / Rules",
        "answer_ar": "لا نستخدم نظام التذاكر. يمكن استخدام كرت واحد للعائلة لشحن الرصيد واللعب.",
        "answer_en": "We do not use tickets. One Future Kid card can be topped up and used by family members.",
        "question_ar": "",
        "question_en": "Are tickets transferable?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "e5517c2d-a7d4-4ece-a33a-bd58adc281d0",
      "data": {
        "category": "Birthday",
        "answer_ar": "نعم، تتضمن الحفلة برنامجًا ترفيهيًا متكاملًا يشمل مقدم حفلة، ألعاب، ومسابقات.",
        "answer_en": "Yes, the birthday party includes a full entertainment program with a host, games, and competitions.",
        "question_ar": "",
        "question_en": "Is there a host or entertainment program at birthday parties?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "7969d871-2fa6-461b-8934-742488669d26",
      "data": {
        "category": "Birthday",
        "answer_ar": "مدة حفلة عيد الميلاد ساعتان، وهي مدة مثالية للاستمتاع بالأنشطة والاحتفال بدون استعجال.",
        "answer_en": "Birthday parties last two hours, giving kids plenty of time to enjoy the celebration and activities.",
        "question_ar": "",
        "question_en": "What is the duration of the birthday party?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "7948ed6a-03fe-497f-89ca-7cbcd30fef07",
      "data": {
        "category": "Facilities",
        "answer_ar": "لا تتوفر خزائن لحفظ الأغراض، حيث يحتفظ الزوار عادةً بمقتنياتهم الشخصية معهم أثناء الزيارة.",
        "answer_en": "Lockers are not provided. Guests typically keep personal items with them during their visit.",
        "question_ar": "",
        "question_en": "Are lockers available?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "b16454b0-3fb5-4c74-b86b-86ad90055777",
      "data": {
        "category": "Membership",
        "answer_ar": "يتم تفعيل الاشتراك فور إتمام عملية الاشتراك واستلام قيمة الاشتراك كاملة.",
        "answer_en": "The membership is activated immediately upon completion of the subscription and receipt of full payment.",
        "question_ar": "",
        "question_en": "When is the membership activated?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "a6919f1c-5d78-42c0-aaf5-b4733a261791",
      "data": {
        "category": "Facilities",
        "answer_ar": "لا تتوفر شبكة Wi-Fi داخل الفروع، وقد تتوفر خدمة الإنترنت من خلال المجمع حسب الموقع.",
        "answer_en": "Wi-Fi is not provided inside Future Kid branches. In some locations, mall Wi-Fi may be available.",
        "question_ar": "",
        "question_en": "Is Wi-Fi available?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "974e4b3a-1393-4383-998c-0a5b458d0288",
      "data": {
        "category": "Birthday",
        "answer_ar": "نعم، تشمل باقة عيد الميلاد ديكورات أساسية وبالونات تضفي أجواء احتفالية جميلة.",
        "answer_en": "Yes, birthday packages include basic decorations and balloons to create a festive atmosphere.",
        "question_ar": "",
        "question_en": "Are decorations included in birthday packages?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "00852e29-911e-4d51-8080-2aaa61f2b9b3",
      "data": {
        "category": "Trips / Groups",
        "answer_ar": "نعم، تتوفر مساحات داخل الفروع لتجمع الطلاب وتنظيم المجموعات.",
        "answer_en": "Yes, designated gathering areas are available within the branches for group coordination.",
        "question_ar": "",
        "question_en": "Is a designated space provided for students to gather?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "6b97ae9f-712f-44cf-bee1-11ead16ade3c",
      "data": {
        "category": "Membership",
        "answer_ar": "تتوفر خدمات رقمية مرتبطة بالاشتراك حسب النظام المعتمد في الفرع.",
        "answer_en": "Digital services related to the membership may be available depending on the system used at the branch.",
        "question_ar": "",
        "question_en": "Can the membership be linked to the app?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "325010dc-60b6-46a3-96aa-abfc320acf69",
      "data": {
        "category": "Trips / Groups",
        "answer_ar": "نعم، يمكن دمج الرحلة مع ورش عمل تعليمية حسب البرنامج المختار.",
        "answer_en": "Yes, trips can be combined with educational workshops depending on the selected program.",
        "question_ar": "",
        "question_en": "Can the trip be combined with educational workshops?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "5e6ac75b-9f88-43be-9fd8-ef0e23b3978d",
      "data": {
        "category": "Pricing / Online",
        "answer_ar": "نعم، يمكن شراء الباقات أو شحن الرصيد إلكترونياً عبر القنوات المتاحة.",
        "answer_en": "Yes, packages or credit can be purchased online through available digital channels.",
        "question_ar": "",
        "question_en": "Can tickets or packages be purchased online?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "000d9756-83ee-4b9d-9ecd-7179c9d89a10",
      "data": {
        "category": "General Info",
        "answer_ar": "تتواجد فروع طفل المستقبل في مجمعات وجمعيات رئيسية في مختلف مناطق الكويت.",
        "answer_en": "Future Kid branches are located in major malls and co-ops across Kuwait.",
        "question_ar": "",
        "question_en": "Where are your branches located?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "6a43abc0-f01f-4094-9739-5153e7335a22",
      "data": {
        "category": "Pricing",
        "answer_ar": "نعم، الدخول مجاني، ويتم الدفع مقابل الألعاب عن طريق شحن كرت طفل المستقبل.",
        "answer_en": "Yes, entry is free. Games are played by topping up a Future Kid card and paying per play swipe.",
        "question_ar": "",
        "question_en": "Is entry free?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "f4ba0393-0a42-4d12-b683-54f51e576c06",
      "data": {
        "category": "Birthday",
        "answer_ar": "نعم، تشمل الحفلة ألعابًا جماعية وأنشطة ترفيهية، بالإضافة إلى وقت لعب مخصص.",
        "answer_en": "Yes, the party includes group games, entertainment activities, and dedicated playtime.",
        "question_ar": "",
        "question_en": "Are games included in the birthday party?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "192f10b4-8a97-4d11-8682-3eac8a0ccaf6",
      "data": {
        "category": "Food / Pricing",
        "answer_ar": "تعتمد العروض على الفرع والموقع، ويمكن الاستفسار من فريق الفرع أثناء الزيارة.",
        "answer_en": "Food offers depend on the branch and location. Please check with the branch team during your visit.",
        "question_ar": "",
        "question_en": "Are there offers on food?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "79c19951-b2b5-4df1-9c21-902c2c0063bb",
      "data": {
        "category": "Birthday",
        "answer_ar": "يتم دفع العربون أثناء عملية الحجز لتأكيد موعد حفلة عيد الميلاد.",
        "answer_en": "The deposit is paid at the time of booking to confirm the birthday party reservation.",
        "question_ar": "",
        "question_en": "When is the deposit paid for a birthday party booking?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "71e808ac-5f22-4866-b97d-5ebc76552094",
      "data": {
        "category": "Pricing",
        "answer_ar": "نقدم باقات وعروض داخل الفروع، بالإضافة إلى عروض أونلاين متجددة.",
        "answer_en": "We offer in-branch packages as well as online promotions that are updated regularly.",
        "question_ar": "",
        "question_en": "What types of packages do you offer?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.141Z"
    },
    {
      "id": "0fc37ca5-237a-4043-8a72-15c361cb5027",
      "data": {
        "category": "Payment",
        "answer_ar": "تتوفر عدة طرق للدفع، تشمل الدفع النقدي، بطاقات البنك، والدفع الإلكتروني داخل الفروع أو عبر القنوات الرقمية المتاحة.",
        "answer_en": "Multiple payment methods are available, including cash, bank cards, and electronic payments at the branches or through available digital channels.",
        "question_ar": "",
        "question_en": "What payment methods are available?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "ee7b0c9c-7c6f-4170-b33e-6afa95b85309",
      "data": {
        "category": "Pricing",
        "answer_ar": "لا نقدم تذكرة شاملة، ولكن تتوفر باقات وعروض خاصة حسب الفرع والموسم.",
        "answer_en": "We do not offer an all-inclusive ticket, but special packages and promotions are available depending on the branch and season.",
        "question_ar": "",
        "question_en": "Do you offer an all-inclusive ticket?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "db30cbbd-b04a-48cb-8e0a-986a8a7bd736",
      "data": {
        "category": "Trips / Groups",
        "answer_ar": "يكون الإشراف الأساسي من مسؤولي المجموعة، مع دعم وتوجيه من فريق الفرع.",
        "answer_en": "Primary supervision is provided by the group's own supervisors, with support and guidance from the branch team.",
        "question_ar": "",
        "question_en": "Do you provide supervisors or guides during the trip?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "7b39f7f3-8981-46d4-8a4e-35036c718b7a",
      "data": {
        "category": "Membership",
        "answer_ar": "لا، لا تتوفر حالياً إمكانية ترقية الاشتراك، حيث يتوفر نوع واحد فقط من الاشتراكات في الوقت الحالي.",
        "answer_en": "Membership upgrades are not available; we only offer one membership package at this time.",
        "question_ar": "",
        "question_en": "Can the membership be upgraded?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "f15144e0-339d-48a7-b9e7-39cf27eefb72",
      "data": {
        "category": "Facilities",
        "answer_ar": "لا تتوفر متاجر هدايا، ولكن توجد منطقة استبدال الجوائز حيث يمكن للأطفال استبدال النقاط بهدايا.",
        "answer_en": "There are no gift shops, but redemption counters are available where children can exchange points for prizes.",
        "question_ar": "",
        "question_en": "Are there gift shops?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "a83ec363-d061-4c27-836e-bcfd48aae690",
      "data": {
        "category": "Birthday",
        "answer_ar": "نعم، يمكن للعملاء إحضار كيكة خاصة بهم، كما يتم توفير كيكة ضمن الباقة من Ceasar's أو BreadTalk.",
        "answer_en": "Yes, customers are welcome to bring their own cake. A cake is also provided as part of the package from Caesar's or BreadTalk.",
        "question_ar": "",
        "question_en": "Can we bring our own cake?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "688e6553-ba86-47ec-8abc-37c637ee2a38",
      "data": {
        "category": "Birthday",
        "answer_ar": "نعم، يمكن تخصيص بعض تفاصيل الحفلة حسب الباقة المختارة، مع توفر إضافات اختيارية مقابل رسوم.",
        "answer_en": "Yes, certain party elements can be customized based on the selected package, with optional add-ons available for an additional fee.",
        "question_ar": "",
        "question_en": "Can the birthday party be customized?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "f7878964-2ae0-4b6f-88a8-0e194cbecdd4",
      "data": {
        "category": "Facilities",
        "answer_ar": "نعم، تتوفر أماكن جلوس في بعض الفروع بالقرب من الألعاب، لراحة الأهل ومتابعة الأطفال أثناء اللعب.",
        "answer_en": "Yes, some branches offer seating areas near the games so parents can relax while watching their children play.",
        "question_ar": "",
        "question_en": "Are there seating areas near the games?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "8a92fa31-7036-4a4e-bc94-819552009c3d",
      "data": {
        "category": "Facilities / Rules",
        "answer_ar": "مسموح إدخال الأكل من الخارج في فروع طفل المستقبل، ولكن يمنع إدخاله داخل مناطق الألعاب حفاظًا على النظافة والسلامة.",
        "answer_en": "Outside food is allowed in Future Kid branches, just not inside the play areas for cleanliness purposes.",
        "question_ar": "",
        "question_en": "Can outside food be brought in?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "8a43da35-e32a-411e-a8f5-d9a5e5627d08",
      "data": {
        "category": "Trips / Groups",
        "answer_ar": "تُستخدم الأساور فقط في رحلات المجموعات الكبيرة مثل المدارس والجهات، ولا تُستخدم في الزيارات الفردية داخل فروع طفل المستقبل.",
        "answer_en": "Future Kid only uses wristbands for large group trips including schools and organizations. They are not used for individual visits.",
        "question_ar": "",
        "question_en": "Are wristbands used?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "20a90e89-ab32-4291-bb3c-ebe76e9104d4",
      "data": {
        "category": "Payment",
        "answer_ar": "نعم، نقبل الدفع عبر المحافظ الإلكترونية مثل Apple Pay وGoogle Pay والمحافظ المدعومة من البنوك المحلية داخل فروع طفل المستقبل.",
        "answer_en": "Yes, we accept e-wallet payments such as Apple Pay, Google Pay, and supported local bank wallets at Future Kid branches.",
        "question_ar": "",
        "question_en": "Do you accept e-wallets?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "e910bad4-f073-4270-ace9-59f50e4e664d",
      "data": {
        "category": "Birthday / Refunds",
        "answer_ar": "نعم، يكون العربون قابلًا للاسترجاع في حال تم إلغاء حفلة عيد الميلاد قبل موعدها بـ 48 ساعة على الأقل.",
        "answer_en": "Yes, the deposit is refundable if the birthday party is cancelled at least 48 hours before the scheduled date.",
        "question_ar": "",
        "question_en": "Is the deposit refundable if the birthday party is cancelled?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "a89e738d-8284-4dd6-a2f1-7adafc874a75",
      "data": {
        "category": "Payment",
        "answer_ar": "نعم، يمكن الدفع باستخدام بطاقات البنوك المحلية داخل فروعنا أو عبر الموقع الإلكتروني، بما في ذلك كي-نت، فيزا، وماستر كارد.",
        "answer_en": "Yes, payment can be made using local bank cards at our branches or online including K-NET, Visa, and Mastercard.",
        "question_ar": "",
        "question_en": "Can payment be made by bank cards?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "767cd2ed-b49e-4d90-baa5-f2e1de3906b7",
      "data": {
        "category": "General / Rules",
        "answer_ar": "نعم، يمكن الخروج والعودة في نفس اليوم، حيث يعتمد النظام على الدفع مقابل اللعب باستخدام كرت طفل المستقبل.",
        "answer_en": "Yes, you may exit and re-enter on the same day, as play is based on a swipe-per-play system using your Future Kid card.",
        "question_ar": "",
        "question_en": "Can I exit and re-enter on the same day?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "d5bfb1c0-8e25-436e-884a-ec746dd562c0",
      "data": {
        "category": "Pricing / Groups",
        "answer_ar": "نعم، تتوفر خصومات للمجموعات من خلال الرحلات والحجوزات الجماعية، مثل المدارس والمؤسسات أو الحفلات والعائلات الكبيرة.",
        "answer_en": "Yes, group discounts are available through our trips and group bookings, such as schools, organizations, or larger parties and families.",
        "question_ar": "",
        "question_en": "Do you offer group discounts?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "efdfe435-c346-4d21-be07-4e9c970f3663",
      "data": {
        "category": "Membership",
        "answer_ar": "الاشتراك صالح في معظم فروع طفل المستقبل، وقد تُستثنى بعض المواقع أو الفعاليات الخاصة.",
        "answer_en": "Memberships are valid at all Future Kid branches. Certain locations or special events may be excluded.",
        "question_ar": "",
        "question_en": "Is the membership valid at all branches?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "214f10e3-2336-48f8-9ae9-e303867327b8",
      "data": {
        "category": "Birthday",
        "answer_ar": "تتوفر حفلات أعياد الميلاد في فروع مختارة. حالياً، تتوفر قاعة مخصصة لأعياد الميلاد في فرع طفل المستقبل - جمعية شرق.",
        "answer_en": "Birthday parties are available at selected branches. Currently, a dedicated birthday room is available at Future Kid's Sharq Co-Op branch.",
        "question_ar": "",
        "question_en": "Where are birthday parties available?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.077Z"
    },
    {
      "id": "d06cfc60-cd20-44e1-99ab-d8d7422a0396",
      "data": {
        "category": "General Info",
        "answer_ar": "طفل المستقبل علامة ترفيهية رائدة في الكويت، تقدم مراكز ترفيه عائلية تضم ألعابًا وأنشطة وتجارب ممتعة للأطفال والعائلات في بيئة آمنة ونظيفة.",
        "answer_en": "Future Kid operates family entertainment centers across Kuwait, offering games, rides, birthday parties, school trips, and seasonal events in a safe and welcoming environment.",
        "question_ar": "",
        "question_en": "General information about Future Kid?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "b8bc9f58-6b03-4b3c-b40a-6f918e773b28",
      "data": {
        "category": "Services / Add-ons",
        "answer_ar": "نعم، تتوفر خدمات إضافية مثل الرسم على الوجه، العلوم المرحة، عروض الساحر، والتصوير، مقابل رسوم إضافية.",
        "answer_en": "Yes, optional add-on services such as face painting, science fairs, magician shows, and photography are available for an additional fee.",
        "question_ar": "",
        "question_en": "Are there additional services available?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "36b53317-48b4-45aa-84be-c50a22f53ea8",
      "data": {
        "category": "Refunds / Credit",
        "answer_ar": "لا يمكن استبدال أو استرجاع الرصيد بعد الشحن. لكنها لا تنتهي صلاحيتها إذا لم تزر الفرع لمدة 12 شهرًا.",
        "answer_en": "Top-up credit cannot be exchanged or refunded once loaded onto the card. However, credit does not expire if you don't visit a branch for 12 months.",
        "question_ar": "",
        "question_en": "Can tickets or credit be exchanged or refunded?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "910b703a-7db0-4cf4-a9e8-396f00d30a83",
      "data": {
        "category": "Facilities / Rules",
        "answer_ar": "لا، حفاظًا على السلامة والنظافة، لا يُسمح بالأكل أو الشرب داخل مناطق الألعاب. ويُسمح بها في الفروع في الأماكن المخصصة.",
        "answer_en": "For safety and cleanliness, eating and drinking are not allowed inside play areas. They are allowed within the branches in designated spots.",
        "question_ar": "",
        "question_en": "Is eating allowed inside the play areas?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "b6582ad9-94ec-4bf8-bae1-f4962bb1837c",
      "data": {
        "category": "Birthday",
        "answer_ar": "يمكن حجز حفلات أعياد الميلاد في الوقت الذي يناسبكم، وتستمر الحفلة لمدة ساعتين، ويتم تأكيد الموعد بالتنسيق مع الفرع.",
        "answer_en": "Birthday parties can be booked at a time that suits you. Each party runs for two hours, with the final time confirmed in coordination with the branch manager.",
        "question_ar": "",
        "question_en": "What time slots are available for birthday parties?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "ef4f4e9a-fa28-4365-aac3-de0053877496",
      "data": {
        "category": "Facilities",
        "answer_ar": "لا تتوفر حضانة أو غرفة رعاية مستقلة للأطفال. يبقى الأهل مسؤولين عن أطفالهم، مع توفر أماكن جلوس عائلية ومساحات راحة بالقرب من مناطق الألعاب.",
        "answer_en": "We do not operate a childcare nursery. Parents remain responsible for their children, and family seating and rest areas are available near the play zones.",
        "question_ar": "",
        "question_en": "Is there a childcare room?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "df1def25-45ae-47c1-a442-9837b076c7c7",
      "data": {
        "category": "Support",
        "answer_ar": "يمكنك التواصل مع فريق الدعم من خلال فريق الفرع، أو عبر الخط الساخن 1881919، أو من خلال قنوات التواصل الرسمية لطفل المستقبل.",
        "answer_en": "You can contact support through branch staff during your visit, via the hotline 1881919, or through Future Kid's official social media channels.",
        "question_ar": "",
        "question_en": "How can I contact support?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "75e4e757-1702-4dfb-ae34-3a4e934af025",
      "data": {
        "category": "Support",
        "answer_ar": "لا يوجد مكتب مخصص لخدمة العملاء داخل الفروع. يقوم فريق الفرع بمساعدة العملاء، كما تتوفر خدمة العملاء عبر الخط الساخن 1881919.",
        "answer_en": "No dedicated customer service desk at branches. Branch staff assist with all inquiries. Customer care is also available via hotline 1881919.",
        "question_ar": "",
        "question_en": "Is there a customer service desk?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "9b8a8121-21ea-4582-864f-3b7e547ede3e",
      "data": {
        "category": "Membership",
        "answer_ar": "الاشتراك السنوي يتم دفعه بالكامل عند بداية العقد ولا يتم تجديده تلقائياً، فلا يمكن إيقافه مؤقتاً.",
        "answer_en": "The annual membership is paid in full at the start and is not auto-renewed, so it cannot be paused.",
        "question_ar": "",
        "question_en": "Can the membership be paused?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "99b00c8a-951f-4e0f-b852-70490e7b58dd",
      "data": {
        "category": "Trips / Safety",
        "answer_ar": "يتم تطبيق إجراءات سلامة واضحة، تشمل الالتزام بقواعد الألعاب، الإشراف المستمر، والتنسيق مع مشرفي المجموعة لضمان سلامة الأطفال.",
        "answer_en": "Clear safety procedures are followed, including adherence to ride rules, continuous supervision, and coordination with group supervisors to ensure children's safety.",
        "question_ar": "",
        "question_en": "What safety procedures are followed for group trips?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "2c6be66c-e0a2-4f10-acf9-57538008f913",
      "data": {
        "category": "Trips / Groups",
        "answer_ar": "تتوفر الرحلات خلال جميع أيام الأسبوع، ويتم تحديد التوقيت بالتنسيق مع مديرة الرحلات في طفل المستقبل لضمان تنظيم التجربة بالشكل الأمثل.",
        "answer_en": "Trips are available throughout the week, with timings confirmed in coordination with Future Kid's Trips Manager to ensure a smooth experience.",
        "question_ar": "",
        "question_en": "What are the available trip times during the week?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "610bc205-f48a-4157-8042-c3236f4739c0",
      "data": {
        "category": "Accessibility",
        "answer_ar": "نعم، نحرص على توفير تجربة مريحة وآمنة للأطفال من ذوي الإعاقة. تتوفر تسهيلات حسب الحالة ونوع اللعبة مع مراعاة السلامة. بعض الألعاب قد لا تكون مناسبة للجميع. لأي ترتيب خاص، يُفضل التواصل مع الفرع مباشرة.",
        "answer_en": "Yes, we aim to provide a safe and comfortable experience for guests with disabilities. Accommodations vary by attraction, with safety first. Some rides may have restrictions. For specific arrangements, contact the branch directly.",
        "question_ar": "",
        "question_en": "Special accommodations for guests with disabilities?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "8532cdc5-ab10-43ae-8b70-ba25057fb32b",
      "data": {
        "category": "Facilities",
        "answer_ar": "إذا كان الفرع في جمعية، فالمواقف مجانية. أما فروع طفل المستقبل في المجمعات التجارية، فيتم تحديد رسوم المواقف من قبل إدارة المجمع، وقد تكون رسوم بسيطة أو مجانية.",
        "answer_en": "At co-op branches, parking is free. For mall branches, parking fees are set by the mall operator, usually a small fee or free.",
        "question_ar": "",
        "question_en": "Is there a parking fee?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "6d90e03e-bd04-4aae-be82-69971cb031a8",
      "data": {
        "category": "Pricing / Games",
        "answer_ar": "نعم، بعض الألعاب قد تتطلب رسومًا إضافية أو متطلبات خاصة حسب نوع اللعبة. على سبيل المثال، ألعاب السوفت بلاي بما في ذلك الترامبولين تتطلب من العملاء ارتداء جوارب، وإذا لم يكن لديهم واحدة يمكنهم شراؤها من الفرع.",
        "answer_en": "Yes, some games may have different pricing or additional requirements. For example, softplay games including trampolines require customers to wear socks; if they don't have any, they can purchase them at the branch.",
        "question_ar": "",
        "question_en": "Do some games require additional fees?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "6348192a-05c0-4fbe-a9b8-13c0b073d56e",
      "data": {
        "category": "Birthday",
        "answer_ar": "تتوفر باقتان لحفلات أعياد الميلاد: الباقة الفضية (15 ضيف) والباقة الذهبية (25 ضيف) كلا الباقتين لديها خيار لإضافة ضيوف إضافيين مقابل رسوم بسيطة.",
        "answer_en": "Two birthday packages are available: Silver package (15 guests), Gold package (25 guests). Both allow extra guests for a small fee.",
        "question_ar": "",
        "question_en": "What birthday packages are available?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "b6f11491-eea5-4b0d-82cb-5ed505e97398",
      "data": {
        "category": "Birthday",
        "answer_ar": "نعم، نقدم حفلات أعياد ميلاد متكاملة داخل فروع مختارة، تشمل الألعاب، الأنشطة الترفيهية، والطعام، لتجربة احتفال سهلة وممتعة للأطفال والأهل.",
        "answer_en": "Yes, we offer fully organized birthday parties at selected branches, including games, entertainment, and food for a fun and stress-free celebration.",
        "question_ar": "",
        "question_en": "Do you offer birthday parties?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    },
    {
      "id": "76b63baa-99d2-41af-9dcf-03090a0fdabe",
      "data": {
        "category": "General Info",
        "answer_ar": "طفل المستقبل شركة كويتية رائدة في مجال الترفيه العائلي، توفر مراكز ترفيه داخلية تجمع بين اللعب، المتعة، والذكريات الجميلة للأطفال والعائلات.",
        "answer_en": "Future Kid is Kuwait's home-grown family entertainment brand, offering indoor amusement centers where kids play, laugh, and create unforgettable memories in a safe and enjoyable environment.",
        "question_ar": "",
        "question_en": "What is Future Kid?"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:38:11.006Z"
    }
  ],
  "intents": [
    {
      "id": "0b54dc93-fa0f-49ec-86bb-3ceae961d0d6",
      "data": {
        "name": "Ramadan Branch + Timings",
        "intent_id": "INT-057",
        "description": "Asking for branch location / Ramadan hours",
        "requires_crm": false,
        "template_ref": "→ TPL-033 (Branch + Timings)",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.375Z"
    },
    {
      "id": "60665224-06c2-4abc-9f43-3402f7b57b6e",
      "data": {
        "name": "Ramadan Top-Up Selection",
        "intent_id": "INT-056",
        "description": "Customer sends 12/20/50/99 to select a package",
        "requires_crm": false,
        "template_ref": "→ Bot Logic: ask branch → send pin + timings",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.368Z"
    },
    {
      "id": "977f50a7-bf3b-45f8-9993-dde509dbafa7",
      "data": {
        "name": "Ramadan Discount Scope",
        "intent_id": "INT-055",
        "description": "Asking if discount applies to recharge/top-up or games only",
        "requires_crm": false,
        "template_ref": "→ TPL-032 (Ramadan Discount Scope)",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.358Z"
    },
    {
      "id": "27117762-c213-4a19-a347-bd0ad688b0a6",
      "data": {
        "name": "Ramadan Promo Inquiry",
        "intent_id": "INT-054",
        "description": "Asking about Ramadan discount, 50% off games, Ramadan packages",
        "requires_crm": false,
        "template_ref": "→ TPL-031 (Ramadan Broadcast)",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.348Z"
    },
    {
      "id": "66b01324-49dd-4477-893d-2360ffff5d34",
      "data": {
        "name": "Card Digital/Physical",
        "intent_id": "INT-053",
        "description": "Asking if card is digital or physical",
        "requires_crm": false,
        "template_ref": "→ FAQ #70",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.340Z"
    },
    {
      "id": "4e7dfaf2-e9b4-45ea-a96e-6435ec12bf7a",
      "data": {
        "name": "Stroller Policy",
        "intent_id": "INT-052",
        "description": "Asking if strollers are allowed",
        "requires_crm": false,
        "template_ref": "→ FAQ #55",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.332Z"
    },
    {
      "id": "e402214e-07f7-4eea-bacc-be7926445d1b",
      "data": {
        "name": "Mascot Characters",
        "intent_id": "INT-051",
        "description": "Asking about mascot/cartoon characters at parties",
        "requires_crm": false,
        "template_ref": "→ FAQ #83",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.325Z"
    },
    {
      "id": "d02132e3-dfef-4e82-9870-eb280cb5862a",
      "data": {
        "name": "Complaint Ticket",
        "intent_id": "INT-050",
        "description": "Asking for complaint reference number or status",
        "requires_crm": false,
        "template_ref": "→ Escalation Logic",
        "escalation_check": true,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.315Z"
    },
    {
      "id": "230d96ec-71b9-498c-a9bf-8403138f3d53",
      "data": {
        "name": "Lost & Found",
        "intent_id": "INT-049",
        "description": "Asking about lost items",
        "requires_crm": false,
        "template_ref": "→ ESCALATE (no policy yet)",
        "escalation_check": true,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.305Z"
    },
    {
      "id": "cbb67728-3673-405b-9458-a07f7e18a029",
      "data": {
        "name": "Allergy / Safety",
        "intent_id": "INT-048",
        "description": "Asking about allergies, latex, medical conditions",
        "requires_crm": false,
        "template_ref": "→ ESCALATE (data gap)",
        "escalation_check": true,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.298Z"
    },
    {
      "id": "a1a89695-9e9a-43c9-96c8-f321834cb1b5",
      "data": {
        "name": "Ride Restrictions",
        "intent_id": "INT-047",
        "description": "Asking about height/age/weight limits for rides",
        "requires_crm": false,
        "template_ref": "→ ESCALATE (data gap)",
        "escalation_check": true,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.291Z"
    },
    {
      "id": "42237e52-aebd-4076-82a7-3fc79e2e3d86",
      "data": {
        "name": "School Trip Program",
        "intent_id": "INT-046",
        "description": "Asking about school-specific trip programs",
        "requires_crm": false,
        "template_ref": "→ FAQ #74-82 / Escalation",
        "escalation_check": true,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.283Z"
    },
    {
      "id": "df9de3aa-2dad-43dd-95dd-d0ff0855ae44",
      "data": {
        "name": "Loyalty Program",
        "intent_id": "INT-045",
        "description": "Asking about loyalty program details",
        "requires_crm": false,
        "template_ref": "→ FAQ #73 / Promos",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.275Z"
    },
    {
      "id": "0dff1600-4575-4a55-a307-9fa76a933d2b",
      "data": {
        "name": "Membership Benefits",
        "intent_id": "INT-044",
        "description": "Asking about member discounts or benefits",
        "requires_crm": false,
        "template_ref": "→ FAQ #62,64,65",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.268Z"
    },
    {
      "id": "d5c9b9a4-e9a4-456c-a10a-5da0a1479553",
      "data": {
        "name": "Membership Transferable",
        "intent_id": "INT-043",
        "description": "Asking if membership can be transferred",
        "requires_crm": false,
        "template_ref": "→ FAQ #63 / Policy",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.261Z"
    },
    {
      "id": "34a2f92a-0a38-466c-ab47-52a43fdccbdd",
      "data": {
        "name": "Membership Renewal",
        "intent_id": "INT-042",
        "description": "Asking how to renew membership",
        "requires_crm": false,
        "template_ref": "→ FAQ #61",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.254Z"
    },
    {
      "id": "2c844d29-166e-4466-92f0-1ede8e952a26",
      "data": {
        "name": "Membership Activation",
        "intent_id": "INT-041",
        "description": "Asking when membership starts",
        "requires_crm": false,
        "template_ref": "→ FAQ #38",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.246Z"
    },
    {
      "id": "feb5a49b-ee1e-42f9-8bb4-68d93947d02d",
      "data": {
        "name": "Corporate / Family Trips",
        "intent_id": "INT-040",
        "description": "Asking about organizing trips for companies or large families",
        "requires_crm": false,
        "template_ref": "→ FAQ #52 / Escalation",
        "escalation_check": true,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.239Z"
    },
    {
      "id": "a4c1f26c-c1ec-4973-b27b-56d131de342e",
      "data": {
        "name": "Educational Workshops",
        "intent_id": "INT-039",
        "description": "Asking about combining trips with learning activities",
        "requires_crm": false,
        "template_ref": "→ FAQ #43",
        "escalation_check": true,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.232Z"
    },
    {
      "id": "1082c60f-20a7-43a7-a4e7-0a549a4a3a40",
      "data": {
        "name": "Food Offers",
        "intent_id": "INT-038",
        "description": "Asking about food deals or promotions",
        "requires_crm": false,
        "template_ref": "→ FAQ #48",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.225Z"
    },
    {
      "id": "a5bf3d93-9675-4440-a626-1ad2b2572848",
      "data": {
        "name": "Invoice / Receipt",
        "intent_id": "INT-037",
        "description": "Asking for receipt or invoice",
        "requires_crm": false,
        "template_ref": "→ FAQ #54",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.218Z"
    },
    {
      "id": "e6951127-f6dc-42b6-852f-7b3c1b12c673",
      "data": {
        "name": "Card / Ticket Sharing",
        "intent_id": "INT-036",
        "description": "Asking if cards or tickets are transferable",
        "requires_crm": false,
        "template_ref": "→ FAQ #50",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.210Z"
    },
    {
      "id": "6de33637-9e16-4612-bd4f-107da64deffe",
      "data": {
        "name": "Online Purchase",
        "intent_id": "INT-035",
        "description": "Asking about buying packages or credit online",
        "requires_crm": false,
        "template_ref": "→ FAQ #44",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.203Z"
    },
    {
      "id": "5a9cef07-8c04-4e09-b7c4-14d355236583",
      "data": {
        "name": "Branch Locations",
        "intent_id": "INT-034",
        "description": "Asking where branches are located",
        "requires_crm": false,
        "template_ref": "→ FAQ #45 / Branch Hours",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.194Z"
    },
    {
      "id": "64209119-9f9c-471c-8504-61269eda1592",
      "data": {
        "name": "Entry Fee / Free Entry",
        "intent_id": "INT-033",
        "description": "Asking if there's an entrance fee",
        "requires_crm": false,
        "template_ref": "→ FAQ #46",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.186Z"
    },
    {
      "id": "bb6312f5-017c-4c2f-a01a-d9984525a3a8",
      "data": {
        "name": "Birthday Entertainment",
        "intent_id": "INT-032",
        "description": "Asking about party host, program, duration",
        "requires_crm": false,
        "template_ref": "→ FAQ #35-36",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.177Z"
    },
    {
      "id": "ba52e8e8-fdf9-4d49-810e-5f76e999601a",
      "data": {
        "name": "All-Inclusive Ticket",
        "intent_id": "INT-031",
        "description": "Asking about unlimited/all-in-one ticket",
        "requires_crm": false,
        "template_ref": "→ FAQ #34",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.170Z"
    },
    {
      "id": "2bff0221-d930-402b-87fc-0253842eba3d",
      "data": {
        "name": "Membership Upgrade",
        "intent_id": "INT-030",
        "description": "Asking about upgrading membership tier",
        "requires_crm": false,
        "template_ref": "→ FAQ #32 / Policy",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.163Z"
    },
    {
      "id": "8f3df020-4afa-4865-8499-8e66b72920b9",
      "data": {
        "name": "Birthday Customization",
        "intent_id": "INT-029",
        "description": "Asking about customizing party or bringing own cake",
        "requires_crm": false,
        "template_ref": "→ FAQ #29-30",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.155Z"
    },
    {
      "id": "98c60ea5-5d43-43ed-89f4-28d81ca06d71",
      "data": {
        "name": "Outside Food Policy",
        "intent_id": "INT-028",
        "description": "Asking about bringing food from outside",
        "requires_crm": false,
        "template_ref": "→ FAQ #27",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.149Z"
    },
    {
      "id": "56b9cf5f-7d95-4eeb-b4d9-8de74f341f0c",
      "data": {
        "name": "Wristband Question",
        "intent_id": "INT-027",
        "description": "Asking about wristbands",
        "requires_crm": false,
        "template_ref": "→ FAQ #26",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.144Z"
    },
    {
      "id": "dc98b062-b1df-4ab6-aecc-d1fd7a9f356d",
      "data": {
        "name": "E-Wallet Payment",
        "intent_id": "INT-026",
        "description": "Asking about Apple Pay, Google Pay acceptance",
        "requires_crm": false,
        "template_ref": "→ FAQ #25",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.137Z"
    },
    {
      "id": "505f1075-df00-492c-a5bd-46e58eaba019",
      "data": {
        "name": "Childcare / Nursery",
        "intent_id": "INT-025",
        "description": "Asking about childcare rooms or nursery",
        "requires_crm": false,
        "template_ref": "→ FAQ #13",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.129Z"
    },
    {
      "id": "4c67a74a-26b7-4e69-89fa-3c677dd62cfb",
      "data": {
        "name": "Add-on Services",
        "intent_id": "INT-024",
        "description": "Asking about face painting, magician, photography",
        "requires_crm": false,
        "template_ref": "→ FAQ #17",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.121Z"
    },
    {
      "id": "37f45398-4f10-4110-b805-a88d8950a8b8",
      "data": {
        "name": "Food Rules",
        "intent_id": "INT-023",
        "description": "Asking about eating inside play areas",
        "requires_crm": false,
        "template_ref": "→ FAQ #15",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.116Z"
    },
    {
      "id": "d5a94522-c425-4242-af0f-cc1f19d60feb",
      "data": {
        "name": "Re-entry Policy",
        "intent_id": "INT-022",
        "description": "Asking about exit and re-entry same day",
        "requires_crm": false,
        "template_ref": "→ FAQ #22",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.109Z"
    },
    {
      "id": "c5b8ae7e-8d39-4a63-aeee-c2a750dc002a",
      "data": {
        "name": "Birthday Deposit Refund",
        "intent_id": "INT-021",
        "description": "Asking if birthday deposit is refundable",
        "requires_crm": false,
        "template_ref": "→ FAQ #24 / Policy",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.100Z"
    },
    {
      "id": "a5bef26b-3297-4e61-956e-65cfbee77f08",
      "data": {
        "name": "Credit Refund / Exchange",
        "intent_id": "INT-020",
        "description": "Asking about refunding or exchanging loaded credit",
        "requires_crm": false,
        "template_ref": "→ FAQ #16 / Policy",
        "escalation_check": true,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.093Z"
    },
    {
      "id": "c9f80e06-171a-4da0-9ffd-dd801fbc60e6",
      "data": {
        "name": "Payment Methods",
        "intent_id": "INT-019",
        "description": "Asking what payment is accepted (cash, card, K-NET)",
        "requires_crm": false,
        "template_ref": "→ FAQ #18,23",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.086Z"
    },
    {
      "id": "47ef205c-2a79-481f-a01a-3b4f24af905f",
      "data": {
        "name": "Membership Pause/Cancel",
        "intent_id": "INT-018",
        "description": "Asking about pausing or canceling membership",
        "requires_crm": false,
        "template_ref": "→ FAQ #10 / Policy",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.080Z"
    },
    {
      "id": "ee6500fd-ff20-4693-a136-168d335c7262",
      "data": {
        "name": "Game Fees / Requirements",
        "intent_id": "INT-017",
        "description": "Asking about additional game fees, socks, etc.",
        "requires_crm": false,
        "template_ref": "→ FAQ #5",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.072Z"
    },
    {
      "id": "1cf4a677-e554-494c-afeb-7e0c67bff918",
      "data": {
        "name": "Contact Support",
        "intent_id": "INT-016",
        "description": "Asking how to reach customer service",
        "requires_crm": false,
        "template_ref": "→ FAQ #11-12",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.065Z"
    },
    {
      "id": "95e4df55-ae3f-4876-b11a-799d8d9dd419",
      "data": {
        "name": "Group Trip Info",
        "intent_id": "INT-015",
        "description": "Asking about school trip times, safety, booking",
        "requires_crm": false,
        "template_ref": "→ FAQ #8-9 / Escalation",
        "escalation_check": true,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.057Z"
    },
    {
      "id": "d64c28a1-1f3b-487d-8e07-354577da45fe",
      "data": {
        "name": "Disability / Accessibility",
        "intent_id": "INT-014",
        "description": "Asking about accommodations for guests with disabilities",
        "requires_crm": false,
        "template_ref": "→ FAQ #7",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.051Z"
    },
    {
      "id": "4c158aaf-11ee-4dd0-b65d-708e22fadb40",
      "data": {
        "name": "Parking Question",
        "intent_id": "INT-013",
        "description": "Asking about parking fees or availability",
        "requires_crm": false,
        "template_ref": "→ FAQ #6",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.045Z"
    },
    {
      "id": "5c9c04d6-fae8-4aca-b6b3-e71f7209e1c8",
      "data": {
        "name": "Birthday Party Inquiry",
        "intent_id": "INT-012",
        "description": "Asking about birthday packages, pricing, or booking",
        "requires_crm": false,
        "template_ref": "→ FAQ #3-4",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.039Z"
    },
    {
      "id": "3093f5c6-9bac-4c43-a891-50c1a89fa2a6",
      "data": {
        "name": "Membership Inquiry",
        "intent_id": "INT-011",
        "description": "Asking about membership card, benefits, pricing, or how to get one",
        "requires_crm": false,
        "template_ref": "→ Promotions (Membership)",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.032Z"
    },
    {
      "id": "09557481-41a1-4290-981c-7bfaa66cc723",
      "data": {
        "name": "Technical Issue",
        "intent_id": "INT-010",
        "description": "Website/app problems",
        "requires_crm": false,
        "template_ref": "Escalation script",
        "escalation_check": true,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.025Z"
    },
    {
      "id": "61157716-fe10-46ed-b073-85f54f4adfad",
      "data": {
        "name": "Ramadan Hours",
        "intent_id": "INT-009",
        "description": "Asking about Ramadan schedule",
        "requires_crm": false,
        "template_ref": "→ Ramadan Hours sheet",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.018Z"
    },
    {
      "id": "06aaf380-1c4e-4f59-b1d3-d1c33bd23459",
      "data": {
        "name": "Location / Directions",
        "intent_id": "INT-008",
        "description": "Asking how to get to a branch",
        "requires_crm": false,
        "template_ref": "→ Branch data",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.012Z"
    },
    {
      "id": "b372f88b-09c3-4d0a-a1ff-48c732647a3f",
      "data": {
        "name": "Group Booking",
        "intent_id": "INT-007",
        "description": "School trip or group event inquiry",
        "requires_crm": false,
        "template_ref": "Escalation script",
        "escalation_check": true,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:18.005Z"
    },
    {
      "id": "5273d5e4-d3ca-41b9-b30f-609c1be35937",
      "data": {
        "name": "Refund",
        "intent_id": "INT-006",
        "description": "Requesting money back",
        "requires_crm": true,
        "template_ref": "Escalation script",
        "escalation_check": true,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:17.999Z"
    },
    {
      "id": "15c6dde6-5f5d-42c1-b7d8-3a3744dec71d",
      "data": {
        "name": "Complaint",
        "intent_id": "INT-005",
        "description": "Expressing dissatisfaction",
        "requires_crm": false,
        "template_ref": "Escalation script",
        "escalation_check": true,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:17.993Z"
    },
    {
      "id": "16fdbaf9-d0b8-4435-8101-6a98f47b7e36",
      "data": {
        "name": "Bank Discount",
        "intent_id": "INT-004",
        "description": "Asking about bank card discounts",
        "requires_crm": false,
        "template_ref": "→ Promotions (Banks)",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:17.986Z"
    },
    {
      "id": "d0cec55a-12d9-42ab-aa5d-ca2c5f831438",
      "data": {
        "name": "Promo Inquiry",
        "intent_id": "INT-003",
        "description": "Asking about current promotions or discounts",
        "requires_crm": false,
        "template_ref": "→ Promotions sheet",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:17.978Z"
    },
    {
      "id": "e9721a4c-f3a3-4315-9b16-45ed68fba427",
      "data": {
        "name": "Pricing / Packages",
        "intent_id": "INT-002",
        "description": "Asking about top-up packages or ride costs",
        "requires_crm": false,
        "template_ref": "→ Promotions sheet",
        "escalation_check": false,
        "revenue_opportunity": true
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:17.971Z"
    },
    {
      "id": "7a1bcf44-8df7-4a7d-b4e2-448b0671c673",
      "data": {
        "name": "Branch Hours",
        "intent_id": "INT-001",
        "description": "Customer asking about opening/closing times",
        "requires_crm": false,
        "template_ref": "→ Branch Hours sheet",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:17.962Z"
    },
    {
      "id": "f022a055-25e2-415d-a63b-fbdd767c057c",
      "data": {
        "name": "Branch Hours",
        "intent_id": "INT-001",
        "description": "test",
        "requires_crm": false,
        "template_ref": "ref",
        "escalation_check": false,
        "revenue_opportunity": false
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:51:31.169Z"
    }
  ],
  "partners": [
    {
      "id": "078e6926-5b9d-44fa-8252-dfddc07be591",
      "data": {
        "name": "KNCC",
        "type": "Corporate",
        "notes_ar": "Partner terms — see documents module.",
        "notes_en": "Partner terms — see documents module."
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:17.949Z"
    },
    {
      "id": "4b90fcea-e3f7-4090-9a25-a714b49b77a1",
      "data": {
        "name": "Sheeel",
        "type": "Loyalty",
        "notes_ar": "Recharge offers: Buy 5KD get 10KD; Buy 10KD get 20KD.",
        "notes_en": "Recharge offers: Buy 5KD get 10KD; Buy 10KD get 20KD."
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:52:17.940Z"
    },
    {
      "id": "f9189d34-8807-48f7-bbca-e2e65e48d528",
      "data": {
        "name": "Al-Arfaj",
        "type": "Corporate",
        "notes_ar": "20% discount for first responders (government/armed-forces/ministry employees). ID required at branch.",
        "notes_en": "20% discount for first responders (government/armed-forces/ministry employees). ID required at branch."
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:49:05.831Z"
    },
    {
      "id": "54a191c4-c3bf-4601-85d2-4567a7df3884",
      "data": {
        "name": "TestP2",
        "type": "Bank",
        "notes_ar": "hi",
        "notes_en": "hello"
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:48:57.396Z"
    },
    {
      "id": "adc4cbe7-5567-40dd-ae68-f53c0edcb1af",
      "data": {
        "name": "TestP",
        "type": "Bank"
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:48:57.359Z"
    }
  ],
  "policy_matrix": [
    {
      "id": "ea5d5a10-950e-421d-aac8-204fdd74b8cf",
      "data": {
        "policy_ar": "",
        "policy_en": "Some kids' areas may have entry fee at selected branches. Branch-dependent.",
        "scenario_ar": "",
        "scenario_en": "Kids Area Fee",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:53.561Z"
    },
    {
      "id": "8001eb21-b5c7-49c2-9606-384ba3fd7974",
      "data": {
        "policy_ar": "",
        "policy_en": "No minimum purchase required.",
        "scenario_ar": "",
        "scenario_en": "No Min Purchase",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:53.561Z"
    },
    {
      "id": "e084e6c6-e74a-4771-b9f8-b748a573dfe3",
      "data": {
        "policy_ar": "",
        "policy_en": "50% off all large games every Monday at all branches. Weekly promo.",
        "scenario_ar": "",
        "scenario_en": "Monday Fun Day",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:53.561Z"
    },
    {
      "id": "aebd8ed9-e72f-4237-8b37-147de4985440",
      "data": {
        "policy_ar": "",
        "policy_en": "Meals and drinks for each child included.",
        "scenario_ar": "",
        "scenario_en": "Birthday - Food Included",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "c38a6ab0-e82f-4a8b-a73a-74c594893e39",
      "data": {
        "policy_ar": "",
        "policy_en": "Mascot characters available for extra party fun. Add-on.",
        "scenario_ar": "",
        "scenario_en": "Birthday - Mascot",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "ef799182-d796-46ad-8ad0-b74ab3dd0961",
      "data": {
        "policy_ar": "",
        "policy_en": "Official invoice can be issued for school/org.",
        "scenario_ar": "",
        "scenario_en": "School Invoice",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "1f481b58-2622-4ffc-8f5f-fb040af93e5b",
      "data": {
        "policy_ar": "",
        "policy_en": "Advance booking required for all trips.",
        "scenario_ar": "",
        "scenario_en": "Trips - Advance Booking",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "53e2f82e-b814-4c99-bdb6-068ef720003f",
      "data": {
        "policy_ar": "",
        "policy_en": "Programs can be customized by age group.",
        "scenario_ar": "",
        "scenario_en": "Trips - Age Customizable",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "fa9d03df-14a0-4ff3-9f85-10fa3aa405c7",
      "data": {
        "policy_ar": "",
        "policy_en": "Meals NOT included in trip programs. Clarify upfront.",
        "scenario_ar": "",
        "scenario_en": "Trips - No Meals",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "927c5722-080a-4d76-8fad-f705587cf147",
      "data": {
        "policy_ar": "",
        "policy_en": "Group games and selected activities included.",
        "scenario_ar": "",
        "scenario_en": "Trips - Games Included",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "fbc61da8-6f3d-4223-a642-5d7c48b575c3",
      "data": {
        "policy_ar": "",
        "policy_en": "Special group discounts available for schools.",
        "scenario_ar": "",
        "scenario_en": "School Discounts",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "e76737d3-2b8f-41c4-851b-bb77d6708b4d",
      "data": {
        "policy_ar": "",
        "policy_en": "2-3 hours per trip program.",
        "scenario_ar": "",
        "scenario_en": "Trip Duration",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "d51d4f43-38c7-4f97-9b66-e93af73c5c5d",
      "data": {
        "policy_ar": "",
        "policy_en": "Minimum 10 students for school trip.",
        "scenario_ar": "",
        "scenario_en": "School Trips - Min 10",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "c2000b9e-85a4-4a2c-bab9-b2d1472c3624",
      "data": {
        "policy_ar": "",
        "policy_en": "Card is physical, not digital (currently). May change.",
        "scenario_ar": "",
        "scenario_en": "Physical Card Only",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "7a9414dd-7517-4e88-9921-be15872e4de4",
      "data": {
        "policy_ar": "",
        "policy_en": "Installment payments not available.",
        "scenario_ar": "",
        "scenario_en": "No Installment",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "29fc975c-9aa0-4528-9aad-7549964197ee",
      "data": {
        "policy_ar": "",
        "policy_en": "Includes discounts on birthday parties.",
        "scenario_ar": "",
        "scenario_en": "Membership - Birthday Discount",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "3460ad52-e26d-4e1f-b547-86f9b61d7c80",
      "data": {
        "policy_ar": "",
        "policy_en": "Members notified when nearing expiration.",
        "scenario_ar": "",
        "scenario_en": "Membership - Expiry Notification",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "39316d01-8f0c-4c4c-99e3-84a1f5185866",
      "data": {
        "policy_ar": "",
        "policy_en": "For family use only, cannot be shared.",
        "scenario_ar": "",
        "scenario_en": "Membership - Family Only",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "d13079b5-223d-4f83-a67c-d5c823468061",
      "data": {
        "policy_ar": "",
        "policy_en": "Cannot be exchanged or refunded once activated.",
        "scenario_ar": "",
        "scenario_en": "Membership - No Refund",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "a135814d-0fbb-4084-ae09-63c725e0c018",
      "data": {
        "policy_ar": "",
        "policy_en": "Renew by visiting nearest branch.",
        "scenario_ar": "",
        "scenario_en": "Membership - Renewal",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "10396b5b-a69e-45cd-8544-190844aad89e",
      "data": {
        "policy_ar": "",
        "policy_en": "Cannot be transferred to another person.",
        "scenario_ar": "",
        "scenario_en": "Membership - Not Transferable",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "0a71109f-1973-48f7-8719-a2bb92759161",
      "data": {
        "policy_ar": "",
        "policy_en": "Deposit required at booking to confirm.",
        "scenario_ar": "",
        "scenario_en": "Birthday - Deposit Required",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "8fb3d4f3-7c0b-47d9-9553-0cb6dad2c738",
      "data": {
        "policy_ar": "",
        "policy_en": "15-25 children included (incl. birthday child). Silver=15, Gold=25.",
        "scenario_ar": "",
        "scenario_en": "Birthday - Guest Count",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:46.150Z"
    },
    {
      "id": "b3b0253e-2c53-4058-92fc-273e7efe36f3",
      "data": {
        "policy_ar": "",
        "policy_en": "Available at branch upon payment or online at checkout.",
        "scenario_ar": "",
        "scenario_en": "Invoices / Receipts",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "b94f19ba-9d6f-428a-a22e-e76a9971b91f",
      "data": {
        "policy_ar": "",
        "policy_en": "Full program included: host, games, competitions. Duration: 2 hours.",
        "scenario_ar": "",
        "scenario_en": "Birthday Entertainment",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "4d4cfc22-6027-46fe-a865-1da492e897f9",
      "data": {
        "policy_ar": "",
        "policy_en": "Not provided. Guests keep personal items with them.",
        "scenario_ar": "",
        "scenario_en": "Lockers",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "2ba639e4-872d-45b7-b885-d8e039bf78ea",
      "data": {
        "policy_ar": "",
        "policy_en": "Activated immediately upon full payment.",
        "scenario_ar": "",
        "scenario_en": "Membership Activation",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "74dd44c9-b2df-45c7-9656-887b32df0b8f",
      "data": {
        "policy_ar": "",
        "policy_en": "Not provided by FK. Mall Wi-Fi may be available at some locations.",
        "scenario_ar": "",
        "scenario_en": "Wi-Fi",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "2ecaa3d4-6c5d-4dab-8ff2-cd90c5b29413",
      "data": {
        "policy_ar": "",
        "policy_en": "Basic decorations and balloons included in all birthday packages.",
        "scenario_ar": "",
        "scenario_en": "Birthday Decorations",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "9cae253d-2475-43e9-86ef-472baf6eba64",
      "data": {
        "policy_ar": "",
        "policy_en": "Digital services may be available depending on branch system.",
        "scenario_ar": "",
        "scenario_en": "Membership App Link",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "66e03710-e5f3-494f-9293-91c019b5354d",
      "data": {
        "policy_ar": "",
        "policy_en": "Trips can be combined with educational workshops per selected program.",
        "scenario_ar": "",
        "scenario_en": "Educational Workshops",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "b99bab3a-86ea-4294-b5e3-cd51a17579aa",
      "data": {
        "policy_ar": "",
        "policy_en": "Packages and credit can be purchased online via digital channels.",
        "scenario_ar": "",
        "scenario_en": "Online Purchases",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "e17eba2e-b9c7-4d32-adcd-3e08e787021b",
      "data": {
        "policy_ar": "",
        "policy_en": "Entry is FREE. Payment is per-play swipe via Future Kid card.",
        "scenario_ar": "",
        "scenario_en": "Entry Fee",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "f0c6af41-3a1c-46b2-a9b7-b06276a2751f",
      "data": {
        "policy_ar": "",
        "policy_en": "No ticket system. One FK card can be used by family members.",
        "scenario_ar": "",
        "scenario_en": "Card Sharing",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "d1cafe8c-0562-4926-9d83-e323168ce121",
      "data": {
        "policy_ar": "",
        "policy_en": "Deposit paid at time of booking to confirm reservation.",
        "scenario_ar": "",
        "scenario_en": "Birthday Deposit Timing",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "0ced865c-ce90-4724-b864-25d7b9359c97",
      "data": {
        "policy_ar": "",
        "policy_en": "Custom trips available for companies and large family groups.",
        "scenario_ar": "",
        "scenario_en": "Corporate / Family Trips",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "90b4f424-113d-405a-a13b-f84924b69da5",
      "data": {
        "policy_ar": "",
        "policy_en": "Can be added for extra fee depending on selected play card.",
        "scenario_ar": "",
        "scenario_en": "Extra Children (Birthday)",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "72d2ccdf-f9c0-4475-ace6-03b2b1842061",
      "data": {
        "policy_ar": "",
        "policy_en": "Allowed in branches, NOT in play areas or on rides.",
        "scenario_ar": "",
        "scenario_en": "Strollers",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "bdc5ba9b-9eeb-4267-bd64-b0950a100d5c",
      "data": {
        "policy_ar": "",
        "policy_en": "Credit usable at all FK branches.",
        "scenario_ar": "",
        "scenario_en": "Credit - All Branches",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "a43347f3-164f-46fe-8be9-67436f513072",
      "data": {
        "policy_ar": "",
        "policy_en": "Can be purchased in advance.",
        "scenario_ar": "",
        "scenario_en": "Credit - Advance Purchase",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "66ec1358-8633-4493-9392-8192a55751f0",
      "data": {
        "policy_ar": "",
        "policy_en": "Loaded credit CANNOT be refunded. Frequent complaint, clear script needed.",
        "scenario_ar": "",
        "scenario_en": "Balance Refund",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "b1989f1d-58da-4601-afcd-9a8308fd85f0",
      "data": {
        "policy_ar": "",
        "policy_en": "No monthly option. Annual membership only.",
        "scenario_ar": "",
        "scenario_en": "Membership - Annual Only",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "01f1f4ee-87c4-4ada-8989-7e79191c79e6",
      "data": {
        "policy_ar": "",
        "policy_en": "Only one membership type under loyalty program.",
        "scenario_ar": "",
        "scenario_en": "Membership - One Tier",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:35:17.724Z"
    },
    {
      "id": "94068e00-44c4-44eb-a263-101875a8bd51",
      "data": {
        "policy_ar": "",
        "policy_en": "Ride rules, continuous supervision, coordination with group supervisors.",
        "scenario_ar": "",
        "scenario_en": "Group Trip Safety",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "4395115b-cf80-48ec-b15c-6f5dd8575f56",
      "data": {
        "policy_ar": "",
        "policy_en": "Customers can exit and re-enter same day. System is swipe-per-play using FK card.",
        "scenario_ar": "",
        "scenario_en": "Re-entry Same Day",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "3c9933a4-fd35-475e-bc53-87c89c4242a1",
      "data": {
        "policy_ar": "",
        "policy_en": "Cash, K-NET, Visa, Mastercard accepted at branches and online.",
        "scenario_ar": "",
        "scenario_en": "Payment Methods",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "e68ea170-248c-4ccd-bd00-4c54d4c20478",
      "data": {
        "policy_ar": "",
        "policy_en": "Deposit is refundable if cancelled at least 48 hours before scheduled date.",
        "scenario_ar": "",
        "scenario_en": "Birthday Deposit Refund",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "adb27e25-b008-481c-b76e-ae392d86326a",
      "data": {
        "policy_ar": "",
        "policy_en": "Each birthday party runs for 2 hours. Time confirmed with branch manager.",
        "scenario_ar": "",
        "scenario_en": "Birthday Party Duration",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "f23f9a4a-7814-4e95-ab40-bbb46a307ba1",
      "data": {
        "policy_ar": "",
        "policy_en": "Dedicated birthday room currently available at Sharq Co-Op branch. May expand.",
        "scenario_ar": "",
        "scenario_en": "Birthday Room Location",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "a25b777a-dd34-4de4-a155-1ecfa65d8450",
      "data": {
        "policy_ar": "",
        "policy_en": "Face painting, science fairs, magician shows, photography, additional fee.",
        "scenario_ar": "",
        "scenario_en": "Add-on Services",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "fbc168ad-96b1-4e1b-af83-bc31be95a082",
      "data": {
        "policy_ar": "",
        "policy_en": "Valid at all branches. Certain locations or special events may be excluded.",
        "scenario_ar": "",
        "scenario_en": "Membership Validity",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "e556b345-1c64-47ce-af92-57c49e91a73c",
      "data": {
        "policy_ar": "",
        "policy_en": "Apple Pay, Google Pay, and local bank wallets accepted at all branches.",
        "scenario_ar": "",
        "scenario_en": "E-Wallets",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "fbaae51d-94a4-4fe2-ac7f-5ded89c26ef9",
      "data": {
        "policy_ar": "",
        "policy_en": "Used only for large group trips (schools, organizations). Not for individual visits.",
        "scenario_ar": "",
        "scenario_en": "Wristbands",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "79d220b3-8fa9-4611-b4ad-287124322621",
      "data": {
        "policy_ar": "",
        "policy_en": "Allowed in branch, but NOT inside play areas. Cleanliness/safety rule.",
        "scenario_ar": "",
        "scenario_en": "Outside Food",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "40c351fc-5313-462d-9022-3fa261c0138a",
      "data": {
        "policy_ar": "",
        "policy_en": "Cake included in package (Caesar's or BreadTalk). Customers may also bring their own.",
        "scenario_ar": "",
        "scenario_en": "Birthday Cake",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "ef9584fd-c257-4105-b041-8b0c4e47c6db",
      "data": {
        "policy_ar": "",
        "policy_en": "Party elements can be customized per package. Add-ons available for extra fee.",
        "scenario_ar": "",
        "scenario_en": "Birthday Customization",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "a2443d95-6cc0-436a-8300-fb85c2d34f29",
      "data": {
        "policy_ar": "",
        "policy_en": "No gift shops. Redemption counters available for exchanging points for prizes.",
        "scenario_ar": "",
        "scenario_en": "Gift Shop",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "808adc84-1f30-44a8-8193-507b12202b64",
      "data": {
        "policy_ar": "",
        "policy_en": "Not available; only one membership tier exists currently.",
        "scenario_ar": "",
        "scenario_en": "Membership Upgrade",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "c59e7298-fddd-429e-8824-5e3a3581d30c",
      "data": {
        "policy_ar": "",
        "policy_en": "Not offered. Special packages and promos vary by branch and season.",
        "scenario_ar": "",
        "scenario_en": "All-Inclusive Ticket",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "82df728c-a636-4d66-94b9-5bfe25842a38",
      "data": {
        "policy_ar": "",
        "policy_en": "Primary supervision by group's own supervisors. Branch team provides support.",
        "scenario_ar": "",
        "scenario_en": "Trip Supervision",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "7f1977b2-3e78-4094-a198-18e786fabb92",
      "data": {
        "policy_ar": "",
        "policy_en": "Top-up credit cannot be exchanged or refunded once loaded. Credit does NOT expire even after 12 months.",
        "scenario_ar": "",
        "scenario_en": "Credit Refund Policy",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "1ad5c220-308f-452d-a6c1-7f9b71441201",
      "data": {
        "policy_ar": "",
        "policy_en": "No eating/drinking inside play areas. Allowed in designated spots within branch.",
        "scenario_ar": "",
        "scenario_en": "Food in Play Areas",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "474be8f0-c5ed-49d2-8120-e514ab314f16",
      "data": {
        "policy_ar": "",
        "policy_en": "No childcare room. Parents remain responsible for children at all times. Family seating available.",
        "scenario_ar": "",
        "scenario_en": "Childcare / Nursery",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:45.742Z"
    },
    {
      "id": "0013fdf2-3000-49b9-a8a2-69d9fb39cf2a",
      "data": {
        "policy_ar": "",
        "policy_en": "No dedicated desk at branches. Branch staff handle inquiries. Hotline: 1881919.",
        "scenario_ar": "",
        "scenario_en": "Customer Service Desk",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "9bbae10d-8483-4421-97e8-80fe02674bb0",
      "data": {
        "policy_ar": "",
        "policy_en": "Case-by-case. Some rides restricted. Branch team guides parents. Contact branch directly.",
        "scenario_ar": "",
        "scenario_en": "Disability Accommodations",
        "exception_ar": "",
        "exception_en": "Yes - handle sensitively"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "24f66329-126d-48e4-8ee6-653f5fa90500",
      "data": {
        "policy_ar": "",
        "policy_en": "Customers must wear socks. Socks available for purchase at branch. Safety requirement.",
        "scenario_ar": "",
        "scenario_en": "Softplay / Trampoline",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "af739389-eadf-4918-92e2-b1c9e01d3d03",
      "data": {
        "policy_ar": "",
        "policy_en": "Co-op branches: free. Mall branches: set by mall operator (small fee or free).",
        "scenario_ar": "",
        "scenario_en": "Parking",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "9e0498f9-9ae4-453f-b545-d3087666fde9",
      "data": {
        "policy_ar": "",
        "policy_en": "Members receive 200 free redemption tickets upon signup. One-time benefit.",
        "scenario_ar": "",
        "scenario_en": "Membership - Redemption Tickets",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "a6804623-8f4c-46b0-9e25-f79716671250",
      "data": {
        "policy_ar": "",
        "policy_en": "Members receive 2 KWD in group game tokens every week for 1 year (52 weeks).",
        "scenario_ar": "",
        "scenario_en": "Membership - Weekly Tokens",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "916776a4-9361-4cfd-9bff-f3bb50796b6e",
      "data": {
        "policy_ar": "",
        "policy_en": "Members get 10% off birthday party bookings.",
        "scenario_ar": "",
        "scenario_en": "Membership - Birthday Discount",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "2612795f-26d6-478c-9e00-3050c210d71c",
      "data": {
        "policy_ar": "",
        "policy_en": "Members get 20% off all games at all branches automatically. Applied via membership card.",
        "scenario_ar": "",
        "scenario_en": "Membership - 20% Game Discount",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "fa9e9bad-fd0e-425f-823e-4810e31888de",
      "data": {
        "policy_ar": "",
        "policy_en": "No specific rule documented",
        "scenario_ar": "",
        "scenario_en": "Child Lost Tickets",
        "exception_ar": "",
        "exception_en": "Yes - escalate"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "f78c1c6d-214c-4809-9230-b0b4922e55a9",
      "data": {
        "policy_ar": "",
        "policy_en": "Replacement card costs 0.250 KWD (250 fils).",
        "scenario_ar": "",
        "scenario_en": "Membership Card - Lost",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "d2187ac1-0fe7-4b9a-b549-60179f9aad58",
      "data": {
        "policy_ar": "",
        "policy_en": "New card costs 0.250 KWD (250 fils). Available at all branches.",
        "scenario_ar": "",
        "scenario_en": "Membership Card - New",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "3ce97274-f18d-4899-8224-4600996e0b24",
      "data": {
        "policy_ar": "",
        "policy_en": "Inform customer, no transactions possible. See Announcements",
        "scenario_ar": "",
        "scenario_en": "Website Down",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "d1fea623-0d42-4dad-9a2c-faca9b2eb234",
      "data": {
        "policy_ar": "",
        "policy_en": "Immediate escalation to Operations Manager",
        "scenario_ar": "",
        "scenario_en": "Safety Incidents",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "87b5d151-54c9-4552-a3c6-fa565fe14134",
      "data": {
        "policy_ar": "",
        "policy_en": "Escalate to Finance/CRM",
        "scenario_ar": "",
        "scenario_en": "Refunds",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "a8394042-fc63-4871-9aad-af4e404bf758",
      "data": {
        "policy_ar": "",
        "policy_en": "Escalate to human agent",
        "scenario_ar": "",
        "scenario_en": "Customer Complaints",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "0221e17d-d7f4-4c6b-b99b-781b1e52baa6",
      "data": {
        "policy_ar": "",
        "policy_en": "Special discounts for groups (min 10 people), 2-3 hour programs. Booking: 66992766",
        "scenario_ar": "",
        "scenario_en": "Group Trips / School Trips",
        "exception_ar": "",
        "exception_en": "No - Do NOT share phone # via AI"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "27a4f785-4e94-4341-b10b-7222ae782203",
      "data": {
        "policy_ar": "",
        "policy_en": "I can connect to an agent to get more details but I don't have that info.",
        "scenario_ar": "",
        "scenario_en": "Cost of Ride",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "cf56e86a-9514-471f-93a5-470183e59da7",
      "data": {
        "policy_ar": "",
        "policy_en": "Available all week. Timings via Trips Manager.",
        "scenario_ar": "",
        "scenario_en": "Group Trip Scheduling",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "494c788a-34a4-48a8-a8b8-efedc8038e04",
      "data": {
        "policy_ar": "",
        "policy_en": "Silver (15 guests) and Gold (25 guests). Extra guests for a fee. Selected branches.",
        "scenario_ar": "",
        "scenario_en": "Birthday Packages",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    },
    {
      "id": "c877e499-2cd9-4c90-8903-8eeab9b3fe51",
      "data": {
        "policy_ar": "",
        "policy_en": "Cannot be paused. Paid in full at start, not auto-renewed.",
        "scenario_ar": "",
        "scenario_en": "Membership - Pause",
        "exception_ar": "",
        "exception_en": "No"
      },
      "status": "active",
      "updatedAt": "2026-04-16T12:34:11.502Z"
    }
  ],
  "promotions": [
    {
      "id": "36809992-6d29-43ce-830c-b369f4216bcc",
      "data": {
        "name": "Monday 50% OFF",
        "type": "Promo",
        "end_date": "2028-10-31T00:00:00.000Z",
        "message_ar": "اثنين المرح\n\nخصم 50٪ على جميع الألعاب الكبيرة كل يوم اثنين\nمتوفر في جميع فروعنا\nالخصم يُطبق تلقائيًا\nبدون الحاجة للتسجيل كل اللي عليك تشحن بطاقتك وتستمتع بالخصم على الألعاب الكبيرة المشمولة فقط\nهل تحب أعرف لك أقرب فرع لك ليوم الاثنين؟",
        "message_en": "On Mondays, we have\nMonday Fun Day\n\n50% OFF all big rides every Monday\nValid in all our branches\nDiscount applies automatically\nNo registration needed You just top up your card and enjoy the discount on eligible big rides only\nWould you like to know which branch is closest to you for Monday?",
        "start_date": "2026-04-05T00:00:00.000Z"
      },
      "status": "active",
      "updatedAt": "2026-04-16T05:44:19.283Z"
    },
    {
      "id": "a4f5b3c8-bb44-4a31-b2d6-f39b1796ee8e",
      "data": {
        "name": "NBK Summer Promo",
        "type": "Bank",
        "end_date": "2026-07-31T23:59:59.000Z",
        "message_ar": "خصم 30% على الألعاب عند الدفع ببطاقة NBK خلال يوليو",
        "message_en": "30% off rides with NBK cards this July",
        "start_date": "2026-07-01T00:00:00.000Z"
      },
      "status": "active",
      "updatedAt": "2026-04-16T03:39:16.105Z"
    },
    {
      "id": "c83690c1-a0c0-4b30-a46d-58950bb19ebc",
      "data": {
        "name": "Sheeel Recharge Offers",
        "type": "Promo",
        "end_date": "2027-03-31T00:00:00.000Z",
        "message_ar": "- اشحن بـ 5 د.ك واحصل على 10 د.ك - اشحن بـ 10 د.ك واحصل على 20 د.ك",
        "message_en": "- Buy 5KD and Get 10KD - Buy 10KD and Get 20KD",
        "start_date": "2026-04-01T00:00:00.000Z"
      },
      "status": "active",
      "updatedAt": "2026-04-15T18:34:35.870Z"
    },
    {
      "id": "5bf17afd-e704-4400-9d93-13746b923f9b",
      "data": {
        "name": "Al-Arfaj 20% Discount",
        "type": "Promo",
        "end_date": "2026-04-30T00:00:00.000Z",
        "message_ar": "ð¼ عرض العرفج لكوادر الصفوف الأمامية ð    استمتع بخصم 20٪ في جميع فروع طفل المستقبل حتى 30/04/2026.  ð ساري لكوادر الصفوف الأمامية ð يشترط إبراز هوية رسمية سارية في الفرع ð يشمل أفراد العائلة المباشرين ð يستخدم لمرة واحدة فقط  ð تحبون أحدد لكم أقرب فرع؟ اكتبوا اسم المنطقة وأنا أحدده لكم فورًا ð©µð",
        "message_en": "Al-Arfaj First Responders Discount ð¼  Enjoy 20% OFF across all Future Kid branches until 30/04/2026.    ð Valid for first responders  ð Requires a valid official ID at the branch   ð Applicable for immediate family   ð One-time use only    ð¡ Let me know your preferred branch or if you’d like to explore our other latest offers ð®",
        "start_date": "2026-04-09T00:00:00.000Z"
      },
      "status": "active",
      "updatedAt": "2026-04-14T18:54:36.458Z"
    }
  ]
};
