/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenAI, Type } from "@google/genai";

// Setup for pdf.js
declare const pdfjsLib: any;
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.mjs';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- I18N Translation Data ---
const translations: { [key: string]: { [key: string]: any } } = {
    'en-US': {
        header: {
            title: "LawEase",
            subtitle: "Your AI-Powered Legal Document Assistant",
        },
        settings: {
            language_label: "Language:",
            contrast_button: "Contrast",
            font_size_label: "Font Size:",
        },
        upload: {
            title: "1. Upload Your Document",
            subtitle: "Upload a PDF or TXT file, or paste the text below.",
            drop_zone_strong: "Click to upload",
            drop_zone_text: " or drag and drop a file here.",
            drop_zone_small: "(PDF or TXT)",
            separator: "OR",
            textarea_placeholder: "Paste your document text here...",
            file_selected_text: "<strong>File selected:</strong><br>",
        },
        buttons: {
            simplify: "Simplify Document",
            analyzing: "Analyzing...",
            ask_question: "Ask Question",
            listening: "Listening...",
            search_lawyers: "Search Lawyers",
            send_message: "Send Message",
            book_consultation: "Book",
            confirm_booking: "Confirm Booking",
            generate_negotiation: "Generate Negotiation Points",
            copy: "Copy",
            copied: "Copied!",
        },
        chat: {
            title: "2. Ask Questions & Explore Scenarios",
            subtitle: "Click the microphone to ask a custom question, or select a common scenario below.",
            separator: "OR",
            thinking: "Thinking..."
        },
        scenarios: {
            terminate: "Terminate Early",
            payment: "Miss Payment",
            modify: "Modify Terms",
            dispute: "Dispute",
            modal_title_prefix: "Scenario: ",
            terminate_title: "Early Termination",
            payment_title: "Missed Payment",
            modify_title: "Modifying Terms",
            dispute_title: "Dispute Resolution",
            analyzing_text: "Analyzing scenario...",
        },
        output: {
            welcome_title: "Welcome to LawEase",
            welcome_subtitle: "Upload your document to get a simple summary, key points, and risk alerts.",
        },
        tts: {
            play: "Play",
            pause: "Pause",
            stop: "Stop",
        },
        resources: {
            title: "Legal Help & Resources",
            tab_legal_help: "Legal Help",
            tab_negotiation: "Negotiation",
            todo_title: "Your Next Steps",
            find_lawyer_title: "Find a Lawyer",
            area_label: "Area of Law:",
            risk_label: "Risk Level:",
            search_placeholder: "Search for lawyers based on your document's needs.",
            finding_lawyers: "Finding lawyers...",
            no_lawyers_found: "No lawyers found matching your criteria.",
        },
        todo: {
            review: "Review analysis & risk factors",
            scenarios: "Explore 'what if' scenarios",
            negotiate: "Generate negotiation points",
            lawyer: "Find a lawyer if needed",
        },
        negotiation: {
            title: "AI Negotiation Coach",
            subtitle: "Generate actionable talking points to improve your position.",
            analyzing: "Generating negotiation points...",
            issue: "The Issue",
            goal: "Suggested Goal",
            talking_point: "Your Talking Point",
            placeholder: "Click the button above to generate negotiation advice based on your document.",
            error: "Sorry, I couldn't generate negotiation points for this document. The AI may not have identified any specific areas for negotiation."
        },
        footer: {
            copyright: "&copy; 2025 LawEase. For informational purposes only. Not legal advice.",
        },
        modals: {
            message_title_prefix: "Send a Secure Message to ",
            message_placeholder: "Type your message here...",
            booking_title_prefix: "Book a Consultation with ",
            date_label: "Select a Date:",
            time_label: "Select a Time:",
            notes_label: "Notes (optional):",
            notes_placeholder: "Briefly describe what you need help with...",
        },
        alerts: {
            unsupported_file: "Unsupported file type. Please upload a PDF or TXT file.",
            no_text: "Please upload a file or paste document text.",
            no_document_for_q: "Please analyze a document first before asking questions.",
            no_document_for_scenario: "Please analyze a document first.",
            message_empty: "Please enter a message.",
            message_sent: "Message sent successfully! (This is a demo)",
            booking_fields_missing: "Please select both a date and a time.",
            booking_confirmed: "Booking confirmed with {lawyerName} on {date} at {time}. (This is a demo)",
            scenario_error: "An error occurred during the scenario analysis. The model may not have been able to find relevant information in the document for this specific scenario. Please try again or ask a custom question.",
            q_error: "Sorry, I encountered an error trying to answer your question."
        },
        stt: {
            listening: "Listening...",
            you_asked: 'You asked: "{speechResult}"',
            error: "Error: {error}",
            not_supported: "Speech recognition not supported in this browser.",
        },
        loading: {
            extracting: "Extracting text from {fileName}...",
            analyzing: "Analyzing with AI..."
        }
    },
    'hi-IN': {
        header: {
            title: "लॉईज",
            subtitle: "आपका एआई-संचालित कानूनी दस्तावेज़ सहायक",
        },
        settings: {
            language_label: "भाषा:",
            contrast_button: "कंट्रास्ट",
            font_size_label: "फ़ॉन्ट आकार:",
        },
        upload: {
            title: "१. अपना दस्तावेज़ अपलोड करें",
            subtitle: "एक पीडीएफ या टीएक्सटी फ़ाइल अपलोड करें, या नीचे टेक्स्ट पेस्ट करें।",
            drop_zone_strong: "अपलोड करने के लिए क्लिक करें",
            drop_zone_text: " या यहां एक फ़ाइल खींचें और छोड़ें।",
            drop_zone_small: "(पीडीएफ या टीएक्सटी)",
            separator: "या",
            textarea_placeholder: "अपना दस्तावेज़ टेक्स्ट यहां पेस्ट करें...",
            file_selected_text: "<strong>फ़ाइल चयनित:</strong><br>",
        },
        buttons: {
            simplify: "दस्तावेज़ को सरल बनाएं",
            analyzing: "विश्लेषण हो रहा है...",
            ask_question: "प्रश्न पूछें",
            listening: "सुन रहा है...",
            search_lawyers: "वकीलों को खोजें",
            send_message: "संदेश भेजें",
            book_consultation: "बुक करें",
            confirm_booking: "बुकिंग की पुष्टि करें",
            generate_negotiation: "मोल-भाव बिंदु उत्पन्न करें",
            copy: "कॉपी",
            copied: "कॉपी किया गया!",
        },
        chat: {
            title: "२. प्रश्न पूछें और परिदृश्यों का अन्वेषण करें",
            subtitle: "एक कस्टम प्रश्न पूछने के लिए माइक्रोफ़ोन पर क्लिक करें, या नीचे एक सामान्य परिदृश्य चुनें।",
            separator: "या",
            thinking: "सोच रहा है..."
        },
        scenarios: {
            terminate: "जल्दी समाप्त करें",
            payment: "भुगतान चूकें",
            modify: "शर्तें संशोधित करें",
            dispute: "विवाद",
            modal_title_prefix: "परिदृश्य: ",
            terminate_title: "जल्दी समाप्ति",
            payment_title: "चूका हुआ भुगतान",
            modify_title: "शर्तों में संशोधन",
            dispute_title: "विवाद समाधान",
            analyzing_text: "परिदृश्य का विश्लेषण हो रहा है...",
        },
        output: {
            welcome_title: "लॉईज में आपका स्वागत है",
            welcome_subtitle: "एक सरल सारांश, मुख्य बिंदु और जोखिम अलर्ट प्राप्त करने के लिए अपना दस्तावेज़ अपलोड करें।",
        },
        tts: {
            play: "चलाएं",
            pause: "रोकें",
            stop: "बंद करें",
        },
        resources: {
            title: "कानूनी सहायता और संसाधन",
            tab_legal_help: "कानूनी सहायता",
            tab_negotiation: "मोल-भाव",
            todo_title: "आपके अगले कदम",
            find_lawyer_title: "एक वकील खोजें",
            area_label: "कानून का क्षेत्र:",
            risk_label: "जोखिम स्तर:",
            search_placeholder: "अपने दस्तावेज़ की ज़रूरतों के आधार पर वकीलों की खोज करें।",
            finding_lawyers: "वकीलों को खोजा जा रहा है...",
            no_lawyers_found: "आपके मानदंडों से मेल खाने वाले कोई वकील नहीं मिले।",
        },
        todo: {
            review: "विश्लेषण और जोखिम कारकों की समीक्षा करें",
            scenarios: "'क्या होगा यदि' परिदृश्यों का अन्वेषण करें",
            negotiate: "मोल-भाव बिंदु उत्पन्न करें",
            lawyer: "यदि आवश्यक हो तो एक वकील खोजें",
        },
        negotiation: {
            title: "एआई मोल-भाव कोच",
            subtitle: "अपनी स्थिति सुधारने के लिए कार्रवाई योग्य वार्ता बिंदु उत्पन्न करें।",
            analyzing: "मोल-भाव बिंदु उत्पन्न किए जा रहे हैं...",
            issue: "मुद्दा",
            goal: "सुझाया गया लक्ष्य",
            talking_point: "आपका वार्ता बिंदु",
            placeholder: "अपने दस्तावेज़ के आधार पर मोल-भाव सलाह उत्पन्न करने के लिए ऊपर दिए गए बटन पर क्लिक करें।",
            error: "क्षमा करें, मैं इस दस्तावेज़ के लिए मोल-भाव बिंदु उत्पन्न नहीं कर सका। हो सकता है कि एआई ने मोल-भाव के लिए कोई विशिष्ट क्षेत्र नहीं पहचाना हो।"
        },
        footer: {
            copyright: "&copy; 2025 लॉईज। केवल सूचनात्मक उद्देश्यों के लिए। कानूनी सलाह नहीं।",
        },
        modals: {
            message_title_prefix: "को एक सुरक्षित संदेश भेजें ",
            message_placeholder: "अपना संदेश यहां टाइप करें...",
            booking_title_prefix: " के साथ एक परामर्श बुक करें",
            date_label: "एक तारीख चुनें:",
            time_label: "एक समय चुनें:",
            notes_label: "नोट्स (वैकल्पिक):",
            notes_placeholder: "संक्षेप में बताएं कि आपको किस चीज़ में मदद चाहिए...",
        },
        alerts: {
            unsupported_file: "असमर्थित फ़ाइल प्रकार। कृपया एक पीडीएफ या टीएक्सटी फ़ाइल अपलोड करें।",
            no_text: "कृपया एक फ़ाइल अपलोड करें या दस्तावेज़ टेक्स्ट पेस्ट करें।",
            no_document_for_q: "प्रश्न पूछने से पहले कृपया एक दस्तावेज़ का विश्लेषण करें।",
            no_document_for_scenario: "कृपया पहले एक दस्तावेज़ का विश्लेषण करें।",
            message_empty: "कृपया एक संदेश दर्ज करें।",
            message_sent: "संदेश सफलतापूर्वक भेजा गया! (यह एक डेमो है)",
            booking_fields_missing: "कृपया एक तारीख और समय दोनों चुनें।",
            booking_confirmed: "{lawyerName} के साथ {date} को {time} बजे बुकिंग की पुष्टि हो गई। (यह एक डेमो है)",
            scenario_error: "परिदृश्य विश्लेषण के दौरान एक त्रुटि हुई। हो सकता है कि मॉडल को इस विशिष्ट परिदृश्य के लिए दस्तावेज़ में प्रासंगिक जानकारी नहीं मिली हो। कृपया पुनः प्रयास करें या एक कस्टम प्रश्न पूछें।",
            q_error: "क्षमा करें, आपके प्रश्न का उत्तर देने का प्रयास करते समय मुझे एक त्रुटि का सामना करना पड़ा।"
        },
        stt: {
            listening: "सुन रहा है...",
            you_asked: 'आपने पूछा: "{speechResult}"',
            error: "त्रुटि: {error}",
            not_supported: "इस ब्राउज़र में वाक् पहचान समर्थित नहीं है।",
        },
        loading: {
            extracting: "{fileName} से टेक्स्ट निकाला जा रहा है...",
            analyzing: "एआई के साथ विश्लेषण हो रहा है..."
        }
    }
};

// DOM Elements
const docTextInput = document.getElementById('doc-text') as HTMLTextAreaElement;
const simplifyBtn = document.getElementById('simplify-btn') as HTMLButtonElement;
const chatSection = document.getElementById('chat-section') as HTMLDivElement;
const outputPanel = document.getElementById('output-panel');
const placeholder = document.getElementById('placeholder');
const loading = document.getElementById('loading');
const loadingText = document.getElementById('loading-text') as HTMLParagraphElement;
const resultsDiv = document.getElementById('results') as HTMLDivElement;
const fileInput = document.getElementById('file-upload') as HTMLInputElement;
const dropZone = document.getElementById('drop-zone') as HTMLLabelElement;
const dropZoneText = document.getElementById('drop-zone-text') as HTMLSpanElement;
const tooltip = document.getElementById('tooltip') as HTMLDivElement;

// Settings & Accessibility Elements
const languageSelect = document.getElementById('language-select') as HTMLSelectElement;
const contrastToggleBtn = document.getElementById('contrast-toggle-btn') as HTMLButtonElement;
const fontDecreaseBtn = document.getElementById('font-decrease-btn') as HTMLButtonElement;
const fontIncreaseBtn = document.getElementById('font-increase-btn') as HTMLButtonElement;
const ttsControls = document.getElementById('tts-controls') as HTMLDivElement;
const ttsPlayBtn = document.getElementById('tts-play-btn') as HTMLButtonElement;
const ttsPauseBtn = document.getElementById('tts-pause-btn') as HTMLButtonElement;
const ttsStopBtn = document.getElementById('tts-stop-btn') as HTMLButtonElement;
const micBtn = document.getElementById('mic-btn') as HTMLButtonElement;
const micText = document.getElementById('mic-text') as HTMLSpanElement;
const sttStatus = document.getElementById('stt-status') as HTMLParagraphElement;
const chatHistory = document.getElementById('chat-history') as HTMLDivElement;


// Scenario Buttons
const scenarioTerminateBtn = document.getElementById('scenario-terminate-early') as HTMLButtonElement;
const scenarioMissPaymentBtn = document.getElementById('scenario-miss-payment') as HTMLButtonElement;
const scenarioModifyTermsBtn = document.getElementById('scenario-modify-terms') as HTMLButtonElement;
const scenarioDisputeBtn = document.getElementById('scenario-dispute') as HTMLButtonElement;

// Resources & Lawyer Referral Elements
const resourcesPanel = document.getElementById('resources-panel') as HTMLDivElement;
const lawyerAreaFilter = document.getElementById('lawyer-area-filter') as HTMLSelectElement;
const lawyerRiskFilter = document.getElementById('lawyer-risk-filter') as HTMLSelectElement;
const searchLawyersBtn = document.getElementById('search-lawyers-btn') as HTMLButtonElement;
const lawyerResultsDiv = document.getElementById('lawyer-results') as HTMLDivElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;

// Message Modal Elements
const messageModal = document.getElementById('message-modal') as HTMLDivElement;
const messageModalTitle = document.getElementById('message-modal-title') as HTMLHeadingElement;
const messageModalCloseBtn = document.getElementById('message-modal-close') as HTMLButtonElement;
const messageModalSendBtn = document.getElementById('message-modal-send-btn') as HTMLButtonElement;
const messageModalTextarea = document.getElementById('message-modal-textarea') as HTMLTextAreaElement;

// Booking Modal Elements
const bookingModal = document.getElementById('booking-modal') as HTMLDivElement;
const bookingModalTitle = document.getElementById('booking-modal-title') as HTMLHeadingElement;
const bookingModalCloseBtn = document.getElementById('booking-modal-close') as HTMLButtonElement;
const bookingForm = document.getElementById('booking-form') as HTMLFormElement;
const bookingDateInput = document.getElementById('booking-date') as HTMLInputElement;
const bookingTimeInput = document.getElementById('booking-time') as HTMLInputElement;

// Scenario Modal Elements
const scenarioModal = document.getElementById('scenario-modal') as HTMLDivElement;
const scenarioModalTitle = document.getElementById('scenario-modal-title') as HTMLHeadingElement;
const scenarioModalCloseBtn = document.getElementById('scenario-modal-close') as HTMLButtonElement;
const scenarioModalContent = document.getElementById('scenario-modal-content') as HTMLDivElement;

// Negotiation Coach Elements
const generateNegotiationBtn = document.getElementById('generate-negotiation-btn') as HTMLButtonElement;
const negotiationResultsDiv = document.getElementById('negotiation-results') as HTMLDivElement;


let uploadedFile: File | null = null;
let currentDocumentText: string | null = null;
const fontSizes = ['font-small', 'font-normal', 'font-large', 'font-xlarge'];
let currentFontSizeIndex = 1; // 'font-normal'

// --- Translation Logic ---
function getTranslation(key: string, lang?: string): string {
    const language = lang || languageSelect.value;
    const langPack = translations[language] || translations['en-US'];
    const keys = key.split('.');
    // FIX: The original function had a potential runtime error and an incorrect type cast.
    // This implementation safely traverses the translation object and ensures a string is always returned.
    let result: any = langPack;
    for (const k of keys) {
        if (typeof result !== 'object' || result === null) {
            return key; // Path is broken, return the key as a fallback.
        }
        result = result[k];
        if (result === undefined) {
            return key; // Key not found in path.
        }
    }

    if (typeof result === 'string') {
        return result; // Successfully found a string translation.
    }

    // The key resolved to a non-string value (e.g., an object). Fallback to the key.
    return key;
}

function translatePage() {
    const lang = languageSelect.value;
    document.documentElement.lang = lang.split('-')[0];
    document.querySelectorAll('[data-translate-key]').forEach(el => {
        const key = el.getAttribute('data-translate-key')!;
        const translation = getTranslation(key, lang);
        if (el.hasAttribute('placeholder')) {
            (el as HTMLInputElement | HTMLTextAreaElement).placeholder = translation;
        } else {
            (el as HTMLElement).innerHTML = translation;
        }
    });
}

function setLanguage(lang: string) {
    languageSelect.value = lang;
    localStorage.setItem('language', lang);
    translatePage();
}

// --- File Upload Logic ---
dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) handleFile(files[0]);
});
fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) handleFile(fileInput.files[0]);
});
function handleFile(file: File) {
    if (file.type === 'application/pdf' || file.type === 'text/plain') {
        uploadedFile = file;
        dropZoneText.innerHTML = `${getTranslation('upload.file_selected_text')}${file.name}`;
    } else {
        alert(getTranslation('alerts.unsupported_file'));
        uploadedFile = null;
        dropZoneText.innerHTML = `
            <strong data-translate-key="upload.drop_zone_strong">${getTranslation('upload.drop_zone_strong')}</strong>
            <span data-translate-key="upload.drop_zone_text">${getTranslation('upload.drop_zone_text')}</span>
            <br>
            <small data-translate-key="upload.drop_zone_small">${getTranslation('upload.drop_zone_small')}</small>
        `;
    }
}

// --- Text Extraction Logic ---
async function processFile(file: File): Promise<string> {
    updateLoadingState(getTranslation('loading.extracting').replace('{fileName}', file.name));
    if (file.type === 'application/pdf') {
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
            fileReader.onload = async (event) => {
                const typedarray = new Uint8Array(event.target!.result as ArrayBuffer);
                try {
                    const pdf = await pdfjsLib.getDocument(typedarray).promise;
                    let textContent = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const text = await page.getTextContent();
                        textContent += text.items.map((s: any) => s.str).join(' ');
                    }
                    resolve(textContent);
                } catch (error) { reject('Error parsing PDF file.'); }
            };
            fileReader.onerror = () => reject('Error reading file.');
            fileReader.readAsArrayBuffer(file);
        });
    } else if (file.type === 'text/plain') {
        return file.text();
    } else {
        throw new Error('Unsupported file type.');
    }
}

// --- UI and State Management ---
function updateLoadingState(message: string) {
    placeholder.classList.add('hidden');
    resultsDiv.innerHTML = '';
    ttsControls.classList.add('hidden');
    loading.classList.remove('hidden');
    loadingText.textContent = message;
    simplifyBtn.disabled = true;
    simplifyBtn.textContent = getTranslation('buttons.analyzing');
}
function resetUI() {
    simplifyBtn.disabled = false;
    simplifyBtn.textContent = getTranslation('buttons.simplify');
    loading.classList.add('hidden');
}
function displayError(message: string) {
    resultsDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}

// --- Main Analysis Logic ---
const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        executiveSummary: { type: Type.STRING, description: 'A 2-3 sentence executive summary of the document\'s purpose.' },
        keyParties: { type: Type.ARRAY, description: 'List of all key parties (people, companies) involved and their roles.', items: { type: Type.STRING } },
        importantDates: { type: Type.ARRAY, description: 'List of important dates, deadlines, or timelines.', items: { type: Type.OBJECT, properties: { date: { type: Type.STRING }, description: { type: Type.STRING } } } },
        financialDetails: { type: Type.ARRAY, description: 'List of all financial obligations, payments, or monetary values mentioned.', items: { type: Type.OBJECT, properties: { amount: { type: Type.STRING }, description: { type: Type.STRING } } } },
        terminationClauses: { type: Type.ARRAY, description: 'Details on termination clauses, including conditions and notice periods.', items: { type: Type.STRING } },
        penalties: { type: Type.ARRAY, description: 'List of penalties, fines, or consequences for breaches.', items: { type: Type.STRING } },
        yourRights: { type: Type.ARRAY, description: 'What are my rights and entitlements under this document?', items: { type: Type.STRING } },
        yourObligations: { type: Type.ARRAY, description: 'What are my obligations and responsibilities?', items: { type: Type.STRING } },
        riskFactors: { type: Type.ARRAY, description: 'List of potential risks, unfavorable terms, or clauses requiring caution.', items: { type: Type.STRING } },
        keyTerms: {
            type: Type.ARRAY,
            description: 'A list of important legal terms found in the document and their simple definitions.',
            items: {
                type: Type.OBJECT,
                properties: {
                    term: { type: Type.STRING, description: 'The legal term.' },
                    definition: { type: Type.STRING, description: 'A simple, plain-language definition of the term.' }
                }
            }
        }
    }
};

function highlightTerms(text: string, keyTerms: { term: string, definition: string }[]): string {
    if (!text || !keyTerms || !Array.isArray(keyTerms) || keyTerms.length === 0) {
        return text;
    }
    const sortedTerms = [...keyTerms].sort((a, b) => b.term.length - a.term.length);
    const definitionMap = new Map<string, string>();
    sortedTerms.forEach(({ term, definition }) => {
        if (term && definition) {
            definitionMap.set(term.toLowerCase(), definition);
        }
    });

    if (definitionMap.size === 0) return text;

    const termsRegex = sortedTerms.map(t => t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`\\b(${termsRegex})\\b`, 'gi');

    return text.replace(regex, (match) => {
        const definition = definitionMap.get(match.toLowerCase());
        if (definition) {
            const escapedDefinition = definition.replace(/"/g, '&quot;');
            return `<span class="legal-term" data-definition="${escapedDefinition}">${match}</span>`;
        }
        return match;
    });
}

function renderTodoList() {
    const todoItems = [
        { id: 'review', key: 'todo.review' },
        { id: 'scenarios', key: 'todo.scenarios' },
        { id: 'negotiate', key: 'todo.negotiate' },
        { id: 'lawyer', key: 'todo.lawyer' },
    ];

    todoList.innerHTML = todoItems.map(item => `
        <li>
            <input type="checkbox" id="todo-${item.id}" name="todo-${item.id}">
            <label for="todo-${item.id}">${getTranslation(item.key)}</label>
        </li>
    `).join('');
}

function renderResults(data: any) {
    const highlight = (text: string) => highlightTerms(text, data.keyTerms || []);

    let html = `<h3>Executive Summary</h3><p>${highlight(data.executiveSummary)}</p>`;
    const renderList = (title: string, items: string[] | { [key: string]: string }[]) => {
        if (!items || items.length === 0) return '';
        let listHtml = `<h3>${title}</h3><ul>`;
        if (typeof items[0] === 'string') {
            listHtml += items.map(item => `<li>${highlight(item)}</li>`).join('');
        } else {
            listHtml += (items as { [key: string]: string }[]).map(item => {
                const keys = Object.keys(item);
                return `<li><strong>${item[keys[0]]}:</strong> ${highlight(item[keys[1]])}</li>`;
            }).join('');
        }
        return listHtml + '</ul>';
    };
    html += renderList('Key Parties', data.keyParties);
    html += renderList('Important Dates', data.importantDates);
    html += renderList('Financial Details', data.financialDetails);
    html += renderList('Your Rights', data.yourRights);
    html += renderList('Your Obligations', data.yourObligations);
    html += renderList('Termination Clauses', data.terminationClauses);
    html += renderList('Penalties & Consequences', data.penalties);
    html += renderList('Risk Factors', data.riskFactors);

    resultsDiv.innerHTML = html;
    ttsControls.classList.remove('hidden');
    chatSection.classList.remove('hidden');

    // Show resources panel and auto-set risk filter
    resourcesPanel.classList.remove('hidden');
    renderTodoList();
    const riskCount = data.riskFactors?.length || 0;
    if (riskCount >= 6) {
        lawyerRiskFilter.value = 'High';
    } else if (riskCount >= 3) {
        lawyerRiskFilter.value = 'Medium';
    } else if (riskCount > 0) {
        lawyerRiskFilter.value = 'Low';
    } else {
        lawyerRiskFilter.value = 'All';
    }
    // Automatically trigger search
    searchLawyersBtn.click();
}


async function performAnalysis(text: string, schema: any, prompt: string) {
    updateLoadingState(getTranslation('loading.analyzing'));
    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${prompt}:\n\n---\n\n${text}`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: schema,
            }
        });
        // FIX: Per Gemini API guidelines, when responseMimeType is 'application/json',
        // the response is a JSON string in the `text` property that needs to be parsed.
        const data = JSON.parse(result.text);
        renderResults(data);
    } catch (error) {
        console.error(error);
        displayError('An error occurred during AI analysis. Please try again.');
    } finally {
        resetUI();
    }
}

simplifyBtn.addEventListener('click', async () => {
    let text = docTextInput.value.trim();
    if (!text && uploadedFile) {
        try { text = await processFile(uploadedFile); }
        catch (error: any) {
            displayError(error.toString());
            resetUI();
            return;
        }
    }
    if (!text) {
        alert(getTranslation('alerts.no_text'));
        return;
    }
    currentDocumentText = text;
    // Clear previous chat history and negotiation for new analysis
    if (chatHistory) chatHistory.innerHTML = '';
    sttStatus.textContent = '';
    negotiationResultsDiv.innerHTML = `<p class="placeholder-text">${getTranslation('negotiation.placeholder')}</p>`;
    
    const selectedLanguageName = languageSelect.options[languageSelect.selectedIndex].text;
    const prompt = `Analyze the following legal document. Identify key legal terms and provide simple definitions for them. Your output must be in JSON format matching the provided schema. The analysis language should be ${selectedLanguageName}.`;
    performAnalysis(text, analysisSchema, prompt);
});


// --- Lawyer Referral Logic ---
const mockLawyers = [
    { name: 'Rohan Sharma', specialization: 'Real Estate', riskLevels: ['Low', 'Medium'], rating: 4.8 },
    { name: 'Priya Patel', specialization: 'Employment', riskLevels: ['Low', 'Medium', 'High'], rating: 4.9 },
    { name: 'Vikram Singh', specialization: 'Business', riskLevels: ['Medium', 'High'], rating: 4.6 },
    { name: 'Anjali Gupta', specialization: 'Family Law', riskLevels: ['Low', 'Medium'], rating: 4.7 },
    { name: 'Siddharth Kumar', specialization: 'Real Estate', riskLevels: ['High'], rating: 4.4 },
];

async function findLawyers(area: string, risk: string): Promise<any[]> {
    lawyerResultsDiv.innerHTML = `<div class="spinner"></div><p style="text-align:center;">${getTranslation('resources.finding_lawyers')}</p>`;
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            const results = mockLawyers.filter(lawyer =>
                (area === 'All' || lawyer.specialization === area) &&
                (risk === 'All' || lawyer.riskLevels.includes(risk))
            );
            resolve(results);
        }, 1000);
    });
}

function renderLawyers(lawyers: any[]) {
    if (lawyers.length === 0) {
        lawyerResultsDiv.innerHTML = `<p class="placeholder-text">${getTranslation('resources.no_lawyers_found')}</p>`;
        return;
    }

    const renderStars = (rating: number) => {
        let stars = '';
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        for (let i = 0; i < fullStars; i++) stars += '<i class="fa-solid fa-star"></i>';
        if (halfStar) stars += '<i class="fa-solid fa-star-half-stroke"></i>';
        for (let i = 0; i < emptyStars; i++) stars += '<i class="fa-regular fa-star"></i>';
        return stars;
    };


    lawyerResultsDiv.innerHTML = lawyers.map(lawyer => `
        <div class="lawyer-card">
            <div class="lawyer-card-header">
                <h4>${lawyer.name}</h4>
                <div class="rating">
                     ${renderStars(lawyer.rating)}
                     <span>(${lawyer.rating})</span>
                </div>
            </div>
            <p>${lawyer.specialization} Law</p>
            <div class="actions">
                <button class="book-btn" data-lawyer="${lawyer.name}">${getTranslation('buttons.book_consultation')}</button>
                <button class="msg-btn" data-lawyer="${lawyer.name}">${getTranslation('buttons.send_message')}</button>
            </div>
        </div>
    `).join('');

    // Add event listeners after rendering
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lawyerName = (e.target as HTMLButtonElement).dataset.lawyer;
            openBookingModal(lawyerName!);
        });
    });
    document.querySelectorAll('.msg-btn').forEach(btn => btn.addEventListener('click', (e) => {
        const lawyerName = (e.target as HTMLButtonElement).dataset.lawyer;
        openMessageModal(lawyerName!);
    }));
}


searchLawyersBtn.addEventListener('click', async () => {
    const area = lawyerAreaFilter.value;
    const risk = lawyerRiskFilter.value;
    const lawyers = await findLawyers(area, risk);
    renderLawyers(lawyers);
});


// --- Messaging Modal Logic ---
function openMessageModal(lawyerName: string) {
    messageModalTitle.textContent = `${getTranslation('modals.message_title_prefix')}${lawyerName}`;
    messageModalTextarea.value = '';
    messageModal.classList.remove('hidden');
}

function closeMessageModal() {
    messageModal.classList.add('hidden');
}
messageModalCloseBtn.addEventListener('click', closeMessageModal);
messageModalSendBtn.addEventListener('click', () => {
    if (messageModalTextarea.value.trim() === '') {
        alert(getTranslation('alerts.message_empty'));
        return;
    }
    alert(getTranslation('alerts.message_sent'));
    closeMessageModal();
});
messageModal.addEventListener('click', (e) => {
    if (e.target === messageModal) closeMessageModal(); // Close on backdrop click
});

// --- Booking Modal Logic ---
function openBookingModal(lawyerName: string) {
    bookingModalTitle.textContent = `${getTranslation('modals.booking_title_prefix')}${lawyerName}`;
    bookingForm.reset();
    // Set min date to today
    bookingDateInput.min = new Date().toISOString().split("T")[0];
    bookingModal.classList.remove('hidden');
}

function closeBookingModal() {
    bookingModal.classList.add('hidden');
}

bookingModalCloseBtn.addEventListener('click', closeBookingModal);

bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeBookingModal(); // Close on backdrop click
});

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = bookingDateInput.value;
    const time = bookingTimeInput.value;

    if (!date || !time) {
        alert(getTranslation('alerts.booking_fields_missing'));
        return;
    }

    const lawyerName = bookingModalTitle.textContent?.replace(getTranslation('modals.booking_title_prefix'), '');
    const alertMessage = getTranslation('alerts.booking_confirmed')
        .replace('{lawyerName}', lawyerName!)
        .replace('{date}', date)
        .replace('{time}', time);
    alert(alertMessage);
    closeBookingModal();
});


// --- Scenario Analysis ---
const scenarioSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: 'A concise summary of the findings for this specific scenario, written in plain language.' },
        isPermitted: { type: Type.STRING, description: 'A clear "Yes", "No", or "Conditionally" answer on whether the scenario is allowed by the document.'},
        procedure: { type: Type.ARRAY, description: 'Step-by-step instructions or procedures required according to the document.', items: { type: Type.STRING } },
        financialImplications: { type: Type.ARRAY, description: 'List of all financial costs, penalties, or implications mentioned in the document.', items: { type: Type.STRING } },
        relevantClauses: { type: Type.ARRAY, description: 'Direct quotes of the most relevant clauses from the document that support the analysis.', items: { type: Type.STRING } }
    }
};

const scenarioPrompts = {
    'terminate': 'Analyze the following legal document and extract information about early termination. Based ONLY on the provided text, detail the specific consequences, procedures, and costs associated with terminating the agreement early. Your output must be in JSON format matching the provided schema.',
    'payment': 'Analyze the following legal document and extract information about a missed payment. Based ONLY on the provided text, detail the consequences of a missed payment, including grace periods, late fees, penalties, and any potential for default or termination. Your output must be in JSON format matching the provided schema.',
    'modify': 'Analyze the following legal document and extract information about modifying the terms of the agreement. Based ONLY on the provided text, describe the procedure for proposing and agreeing upon changes, including any requirements for written consent or amendments. Your output must be in JSON format matching the provided schema.',
    'dispute': 'Analyze the following legal document and extract information about dispute resolution. Based ONLY on the provided text, identify the required process for handling disagreements, such as negotiation, mediation, arbitration, or litigation, and mention the governing jurisdiction. Your output must be in JSON format matching the provided schema.'
};

function openScenarioModal(title: string) {
    scenarioModalTitle.textContent = title;
    scenarioModalContent.innerHTML = `<div class="spinner"></div><p style="text-align:center;">${getTranslation('scenarios.analyzing_text')}</p>`;
    scenarioModal.classList.remove('hidden');
}

function closeScenarioModal() {
    scenarioModal.classList.add('hidden');
}

function renderScenarioResults(data: any) {
    const getStatusBadge = (status: string) => {
        if (!status) return `<span>${status}</span>`;
        const lowerStatus = status.toLowerCase();
        if (lowerStatus.includes('yes')) {
            return `<span class="status-badge status-yes">${status}</span>`;
        }
        if (lowerStatus.includes('no')) {
            return `<span class="status-badge status-no">${status}</span>`;
        }
        if (lowerStatus.includes('conditionally')) {
            return `<span class="status-badge status-conditional">${status}</span>`;
        }
        return `<span>${status}</span>`;
    };

    let html = `<p><strong>Summary:</strong> ${data.summary || 'Not specified.'}</p>`;
    html += `<p><strong>Is this permitted?</strong> ${getStatusBadge(data.isPermitted || 'Not clearly specified.')}</p>`;

    const renderList = (title: string, items: string[], type: 'ul' | 'blockquote' = 'ul', iconClass: string) => {
        if (!items || items.length === 0) return '';
        let listHtml = `<h4><i class="fa-solid ${iconClass}"></i> ${title}</h4>`;
        if (type === 'ul') {
            listHtml += '<ul>';
            listHtml += items.map(item => `<li>${item}</li>`).join('');
            listHtml += '</ul>';
        } else {
            listHtml += items.map(item => `<blockquote>${item}</blockquote>`).join('');
        }
        return listHtml;
    };
    
    html += renderList('Procedure / Steps to Follow', data.procedure, 'ul', 'fa-list-check');
    html += renderList('Financial Implications', data.financialImplications, 'ul', 'fa-sack-dollar');
    html += renderList('Relevant Clauses from Document', data.relevantClauses, 'blockquote', 'fa-quote-left');

    scenarioModalContent.innerHTML = html;
}

async function performScenarioAnalysis(scenarioType: keyof typeof scenarioPrompts, titleKey: string) {
    if (!currentDocumentText) {
        alert(getTranslation('alerts.no_document_for_scenario'));
        return;
    }

    const modalTitle = `${getTranslation('scenarios.modal_title_prefix')} ${getTranslation(`scenarios.${titleKey}`)}`;
    openScenarioModal(modalTitle);

    try {
        const prompt = scenarioPrompts[scenarioType];
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${prompt}\n\n---\n\n${currentDocumentText}`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: scenarioSchema,
            }
        });
        // FIX: Per Gemini API guidelines, when responseMimeType is 'application/json',
        // the response is a JSON string in the `text` property that needs to be parsed.
        const data = JSON.parse(result.text);
        renderScenarioResults(data);
    } catch (error) {
        console.error(`Error during ${scenarioType} analysis:`, error);
        scenarioModalContent.innerHTML = `<p style="color: red;">${getTranslation('alerts.scenario_error')}</p>`;
    }
}

// Wire up buttons and modal controls
scenarioTerminateBtn.addEventListener('click', () => performScenarioAnalysis('terminate', 'terminate_title'));
scenarioMissPaymentBtn.addEventListener('click', () => performScenarioAnalysis('payment', 'payment_title'));
scenarioModifyTermsBtn.addEventListener('click', () => performScenarioAnalysis('modify', 'modify_title'));
scenarioDisputeBtn.addEventListener('click', () => performScenarioAnalysis('dispute', 'dispute_title'));

scenarioModalCloseBtn.addEventListener('click', closeScenarioModal);
scenarioModal.addEventListener('click', (e) => {
    if (e.target === scenarioModal) closeScenarioModal(); // Close on backdrop click
});


// --- Accessibility and Settings ---
function applySettings() {
    // Contrast
    document.body.classList.toggle('high-contrast', localStorage.getItem('highContrast') === 'true');
    // Font Size
    document.body.className = document.body.className.replace(/font-\w+/g, '');
    document.body.classList.add(fontSizes[currentFontSizeIndex]);
}

contrastToggleBtn.addEventListener('click', () => {
    const isHighContrast = document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', isHighContrast.toString());
});

fontDecreaseBtn.addEventListener('click', () => {
    if (currentFontSizeIndex > 0) {
        currentFontSizeIndex--;
        localStorage.setItem('fontSizeIndex', currentFontSizeIndex.toString());
        applySettings();
    }
});

fontIncreaseBtn.addEventListener('click', () => {
    if (currentFontSizeIndex < fontSizes.length - 1) {
        currentFontSizeIndex++;
        localStorage.setItem('fontSizeIndex', currentFontSizeIndex.toString());
        applySettings();
    }
});

// --- Q&A Chat Logic ---
function appendChatMessage(role: 'user' | 'ai', text: string): HTMLDivElement {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}-message`;
    const icon = role === 'user' ? 'fa-solid fa-user' : 'fa-solid fa-robot';
    messageDiv.innerHTML = `
        <div class="icon"><i class="${icon}"></i></div>
        <div class="text">${text}</div>
    `;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll
    return messageDiv;
}

async function handleQuestion(question: string) {
    if (!currentDocumentText) {
        appendChatMessage('ai', getTranslation('alerts.no_document_for_q'));
        return;
    }

    appendChatMessage('user', question);
    const thinkingMessage = appendChatMessage('ai', getTranslation('chat.thinking'));
    const thinkingText = thinkingMessage.querySelector('.text') as HTMLDivElement;
    thinkingText.classList.add('thinking');

    try {
        const selectedLanguageName = languageSelect.options[languageSelect.selectedIndex].text;
        const prompt = `Based on the following document, please answer the user's question.
        Document:
        ---
        ${currentDocumentText}
        ---
        Question: "${question}"
        
        Provide a clear and concise answer in ${selectedLanguageName}.`;

        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        thinkingText.textContent = result.text;
        thinkingText.classList.remove('thinking');

    } catch (error) {
        console.error("Error asking follow-up question:", error);
        thinkingText.textContent = getTranslation('alerts.q_error');
        thinkingText.classList.remove('thinking');
    }
}


// --- Speech to Text (STT) & Text to Speech (TTS) ---
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
let recognition: any | null = null;
const sttLanguageMap: { [key: string]: string } = {
    'en-US': 'en-US',
    'en-GB': 'en-GB',
    'en-AU': 'en-AU',
    'es-ES': 'es-ES',
    'fr-FR': 'fr-FR',
    'de-DE': 'de-DE',
    'it-IT': 'it-IT',
    'hi-IN': 'hi-IN',
};


if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        sttStatus.textContent = getTranslation('stt.you_asked').replace('{speechResult}', speechResult);
        handleQuestion(speechResult);
    };
    recognition.onspeechend = () => recognition.stop();
    recognition.onend = () => {
        micBtn.classList.remove('listening');
        micText.textContent = getTranslation('buttons.ask_question');
    };
    recognition.onerror = (event: any) => {
        sttStatus.textContent = getTranslation('stt.error').replace('{error}', event.error);
    };
} else {
    micBtn.disabled = true;
    sttStatus.textContent = getTranslation('stt.not_supported');
}

micBtn.addEventListener('click', () => {
    if (recognition) {
        if (micBtn.classList.contains('listening')) {
            recognition.stop();
        } else {
            const selectedLangCode = languageSelect.value;
            recognition.lang = sttLanguageMap[selectedLangCode] || 'en-US'; // Fallback

            recognition.start();
            micBtn.classList.add('listening');
            micText.textContent = getTranslation('buttons.listening');
            sttStatus.textContent = getTranslation('stt.listening');
        }
    }
});

const synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();
ttsPlayBtn.addEventListener('click', () => {
    if (synth.paused) {
        synth.resume();
    } else {
        utterance.text = resultsDiv.innerText;
        synth.speak(utterance);
    }
});
ttsPauseBtn.addEventListener('click', () => synth.pause());
ttsStopBtn.addEventListener('click', () => synth.cancel());


// --- Tooltip Logic for Legal Terms ---
resultsDiv.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('legal-term')) {
        const definition = target.dataset.definition;
        if (definition) {
            tooltip.innerHTML = definition;
            tooltip.classList.add('visible');
        }
    }
});

resultsDiv.addEventListener('mousemove', (e) => {
    if (tooltip.classList.contains('visible')) {
        let x = e.clientX + 15;
        let y = e.clientY + 15;
        if (x + tooltip.offsetWidth > window.innerWidth) {
            x = e.clientX - tooltip.offsetWidth - 15;
        }
        if (y + tooltip.offsetHeight > window.innerHeight) {
            y = e.clientY - tooltip.offsetHeight - 15;
        }
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    }
});

resultsDiv.addEventListener('mouseout', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('legal-term')) {
        tooltip.classList.remove('visible');
    }
});


// --- Tab Switching Logic for Resources Panel ---
function setupTabs() {
    const tabs = resourcesPanel.querySelectorAll('.tab-link');
    const tabContents = resourcesPanel.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deactivate all
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Activate clicked
            tab.classList.add('active');
            const targetContentId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetContentId!);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// --- AI Negotiation Coach ---
const negotiationSchema = {
    type: Type.ARRAY,
    description: "A list of negotiation points based on the document.",
    items: {
        type: Type.OBJECT,
        properties: {
            issue: { type: Type.STRING, description: "A simple, one-sentence explanation of why a specific clause is a concern (e.g., 'The termination fee is unusually high.')." },
            goal: { type: Type.STRING, description: "A clear, suggested outcome for the user to aim for (e.g., 'Propose reducing the fee or adding a waiver clause.')." },
            talkingPoint: { type: Type.STRING, description: "A ready-to-use script the user can say or write (e.g., 'I've reviewed the termination clause, and the fee seems higher than industry standard. Could we explore adjusting it?')." }
        }
    }
};

const negotiationPrompt = `Act as an expert contract negotiator. Your task is to analyze the following legal document and identify clauses that are unfavorable, ambiguous, or non-standard for the primary user. For each identified clause, you must create a clear, actionable negotiation point. Your output must be in JSON format matching the provided schema. Do not include points that are merely informational; focus only on items that are genuinely negotiable and potentially disadvantageous. If no such points are found, return an empty array. The negotiation points should be in {language}.`;

function renderNegotiationPoints(points: any[]) {
    if (!points || points.length === 0) {
        negotiationResultsDiv.innerHTML = `<p class="placeholder-text">${getTranslation('negotiation.error')}</p>`;
        return;
    }

    negotiationResultsDiv.innerHTML = points.map((point, index) => `
        <div class="negotiation-card">
            <div class="card-section">
                <h5><i class="fa-solid fa-flag"></i> ${getTranslation('negotiation.issue')}</h5>
                <p>${point.issue}</p>
            </div>
            <div class="card-section">
                <h5><i class="fa-solid fa-bullseye"></i> ${getTranslation('negotiation.goal')}</h5>
                <p>${point.goal}</p>
            </div>
            <div class="card-section">
                <h5><i class="fa-solid fa-comments"></i> ${getTranslation('negotiation.talking_point')}</h5>
                <p id="talking-point-${index}">${point.talkingPoint}</p>
                <button class="copy-btn" data-target="talking-point-${index}">
                    <i class="fa-solid fa-copy"></i>
                    <span>${getTranslation('buttons.copy')}</span>
                </button>
            </div>
        </div>
    `).join('');
}

async function performNegotiationAnalysis() {
    if (!currentDocumentText) {
        alert(getTranslation('alerts.no_document_for_scenario'));
        return;
    }

    negotiationResultsDiv.innerHTML = `<div class="spinner"></div><p style="text-align:center;">${getTranslation('negotiation.analyzing')}</p>`;
    generateNegotiationBtn.disabled = true;

    try {
        const selectedLanguageName = languageSelect.options[languageSelect.selectedIndex].text;
        const prompt = negotiationPrompt.replace('{language}', selectedLanguageName);
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${prompt}\n\n---\n\n${currentDocumentText}`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: negotiationSchema,
            }
        });
        // FIX: Per Gemini API guidelines, when responseMimeType is 'application/json',
        // the response is a JSON string in the `text` property that needs to be parsed.
        const data = JSON.parse(result.text);
        renderNegotiationPoints(data);
    } catch (error) {
        console.error("Error during negotiation analysis:", error);
        negotiationResultsDiv.innerHTML = `<p class="placeholder-text">${getTranslation('negotiation.error')}</p>`;
    } finally {
        generateNegotiationBtn.disabled = false;
    }
}

generateNegotiationBtn.addEventListener('click', performNegotiationAnalysis);

// Event delegation for copy buttons
negotiationResultsDiv.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const copyBtn = target.closest('.copy-btn') as HTMLButtonElement;
    if (copyBtn) {
        const targetId = copyBtn.dataset.target!;
        const textToCopy = (document.getElementById(targetId) as HTMLElement).innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const btnSpan = copyBtn.querySelector('span')!;
            btnSpan.textContent = getTranslation('buttons.copied');
            copyBtn.disabled = true;
            setTimeout(() => {
                btnSpan.textContent = getTranslation('buttons.copy');
                copyBtn.disabled = false;
            }, 2000);
        });
    }
});


// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    currentFontSizeIndex = parseInt(localStorage.getItem('fontSizeIndex') || '1');
    applySettings();
    const savedLanguage = localStorage.getItem('language') || 'en-US';
    setLanguage(savedLanguage);
    setupTabs();
    negotiationResultsDiv.innerHTML = `<p class="placeholder-text">${getTranslation('negotiation.placeholder')}</p>`; // Set initial placeholder

    // Add event listener for the to-do list
    todoList.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.type === 'checkbox') {
            const li = target.closest('li');
            if (li) {
                li.classList.toggle('completed', target.checked);
            }
        }
    });
});

languageSelect.addEventListener('change', () => {
    setLanguage(languageSelect.value);
});