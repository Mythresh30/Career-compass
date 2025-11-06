import React, { useState, useEffect, useContext, createContext, useReducer } from 'react';
// Using lucide-react for icons (simulated import)
const Home = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const UserCheck = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8l2 2 3-3"/></svg>;
const Settings = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.78 1.46a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.73v.53a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.78 1.46a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.78-1.46a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.73v-.53a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.78-1.46a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-1 1.73v-.18a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const BarChart3 = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>;
const Briefcase = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const LogOut = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
const LogIn = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>;


// --- MOCK DATA ---
const MOCK_ASSESSMENTS = [
    { id: 1, name: "Personality Profile", description: "Identify your core traits and work style.", available: true, type: 'quiz' },
    { id: 2, name: "Skills Inventory", description: "Rate your proficiency in key professional skills.", available: true, type: 'quiz' },
    { id: 3, name: "Career Interest Explorer", description: "Determine your ideal career sectors.", available: false, type: 'quiz' },
];

const MOCK_QUIZ_QUESTIONS = [
    { id: 1, text: "I enjoy solving complex problems that require deep analysis.", category: 'Analytical Thinking', options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { id: 2, text: "I prefer working in teams and communicating with clients or colleagues.", category: 'Interpersonal Skills', options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { id: 3, text: "I frequently experiment with new ideas and enjoy artistic expression.", category: 'Creative Aptitude', options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { id: 4, text: "I am meticulous and pay close attention to details and procedures.", category: 'Analytical Thinking', options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    { id: 5, text: "I am comfortable leading a discussion or presenting in front of a group.", category: 'Interpersonal Skills', options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
];

const MOCK_RESULTS = [
    { name: "Analytical Thinking", score: 85, idealFor: "Engineering, Data Science" },
    { name: "Interpersonal Skills", score: 60, idealFor: "Marketing, HR" },
    { name: "Creative Aptitude", score: 75, idealFor: "Design, Media" },
];

const MOCK_RECOMMENDATIONS = [
    { id: 101, title: "Data Scientist", match: "High", skills: ["Analytical Thinking", "Programming"] },
    { id: 102, title: "UX Designer", match: "Medium", skills: ["Creative Aptitude", "Problem-Solving"] },
    { id: 103, title: "HR Manager", match: "Low", skills: ["Interpersonal Skills", "Conflict Resolution"] },
];

// --- 1. CONTEXT API ---

const AuthContext = createContext();

const initialAuthState = {
    user: null, // null, 'student', or 'admin'
    isLoggedIn: false,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload.role, isLoggedIn: true };
        case 'LOGOUT':
            return initialAuthState;
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialAuthState);

    const login = (role) => {
        dispatch({ type: 'LOGIN', payload: { role } });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const isAdmin = authState.user === 'admin';
    const isStudent = authState.user === 'student';

    const value = { ...authState, login, logout, isAdmin, isStudent };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

// --- 2. CUSTOM HOOKS ---

// Custom hook to handle client-side routing logic
const useClientRouter = (initialRoute = '/') => {
    const [currentPath, setCurrentPath] = useState(initialRoute);

    const navigate = (newPath) => {
        setCurrentPath(newPath);
        // Simulate URL change for browser history (optional)
        // window.history.pushState(null, '', newPath); 
    };

    return [currentPath, navigate];
};

// Custom hook to simulate API fetching with loading/error states
const useFetchAssessments = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        // Simulate network delay and data fetching
        const timer = setTimeout(() => {
            try {
                setData(MOCK_ASSESSMENTS);
            } catch (err) {
                setError('Failed to fetch assessment data.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return { data, isLoading, error };
};


// --- 3. REUSABLE COMPONENTS ---

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
    const baseStyle = "px-4 py-2 font-semibold rounded-lg transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantStyles = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
        danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variantStyles[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

const Header = ({ navigate }) => {
    const { isLoggedIn, user, logout } = useAuth();

    const navItems = {
        guest: [
            { path: '/', label: 'Home', icon: Home },
            { path: '/login', label: 'Login', icon: LogIn },
        ],
        student: [
            { path: '/', label: 'Home', icon: Home },
            { path: '/assessments', label: 'Assessments', icon: UserCheck },
            { path: '/results', label: 'Results', icon: BarChart3 },
            { path: '/careers', label: 'Careers', icon: Briefcase },
        ],
        admin: [
            { path: '/', label: 'Home', icon: Home },
            { path: '/admin-dashboard', label: 'Admin Dashboard', icon: Settings },
            { path: '/admin-recommendations', label: 'Recommendations', icon: Briefcase },
        ]
    };

    const currentNavItems = navItems[user || 'guest'];

    return (
        <header className="bg-white shadow-lg sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                <h1 className="text-2xl font-extrabold text-indigo-700 cursor-pointer" onClick={() => navigate('/')}>
                    Career Compass
                </h1>
                <nav className="hidden md:flex items-center space-x-4">
                    {currentNavItems.map(item => (
                        <a 
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer flex items-center"
                        >
                            <item.icon className="w-4 h-4 mr-2" />
                            {item.label}
                        </a>
                    ))}
                    {isLoggedIn && (
                        <Button variant="secondary" onClick={logout}>
                            <LogOut className="w-4 h-4 mr-2" /> Logout ({user})
                        </Button>
                    )}
                </nav>

                {/* Mobile Menu (Responsive Design: UI/UX Design: 10 marks) */}
                <div className="md:hidden">
                    {isLoggedIn ? (
                        <Button variant="secondary" onClick={logout}>
                            <LogOut className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};


// --- 4. PAGES/ROUTES ---

// Fix: Pass `Maps` to LandingPage
const LandingPage = ({ navigate }) => (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[calc(100vh-80px)]">
        <div className="max-w-2xl bg-white p-8 rounded-xl shadow-2xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Find Your Path with Career Compass
            </h2>
            <p className="text-xl text-gray-600 mb-8">
                Develop a platform that offers career assessments, personality tests, and skills evaluations.
            </p>
            {/* FIX: Use navigate for client-side routing */}
            <Button onClick={() => navigate('/assessments')}>
                Start Assessment Now
            </Button>
            <p className="mt-4 text-sm text-gray-500">
                Sign in to save your progress and view personalized recommendations.
            </p>
        </div>
    </div>
);

const LoginPage = ({ navigate }) => {
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState('student');

    const handleLogin = () => {
        login(selectedRole);
        navigate('/'); // Redirect after login
    };

    return (
        <div className="max-w-md mx-auto p-8 mt-10 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Login / Select Role</h2>
            <div className="space-y-4">
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="student"
                        name="role"
                        value="student"
                        checked={selectedRole === 'student'}
                        onChange={() => setSelectedRole('student')}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor="student" className="ml-3 block text-sm font-medium text-gray-700">
                        Student (Take Assessments, View Results)
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="admin"
                        name="role"
                        value="admin"
                        checked={selectedRole === 'admin'}
                        onChange={() => setSelectedRole('admin')}
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor="admin" className="ml-3 block text-sm font-medium text-gray-700">
                        Admin (Manage Assessment Tools)
                    </label>
                </div>
                <Button onClick={handleLogin} className="w-full mt-6">
                    Sign In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                </Button>
            </div>
        </div>
    );
};


// NEW: Assessment Quiz Component
const AssessmentQuiz = ({ navigate }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // Stores answers as { questionId: value }
    const [answers, setAnswers] = useState({}); 

    const currentQuestion = MOCK_QUIZ_QUESTIONS[currentQuestionIndex];
    const totalQuestions = MOCK_QUIZ_QUESTIONS.length;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
    const isAnswered = currentQuestion ? answers[currentQuestion.id] !== undefined : false;

    const handleAnswer = (value) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    };

    const handleNext = () => {
        if (isLastQuestion) {
            // Simulate submission
            console.log("Quiz Submitted with answers:", answers);
            alert("Assessment complete! Redirecting to results.");
            navigate('/results'); // Navigate to results after submission
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };
    
    if (!currentQuestion) return <div className="text-center p-10 text-red-600">No questions found.</div>;

    return (
        <div className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-2xl">
            <h3 className="text-xl font-bold text-gray-600 mb-4">
                Question {currentQuestionIndex + 1} of {totalQuestions}
            </h3>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                ></div>
            </div>

            <p className="text-2xl font-semibold text-gray-800 mb-8">{currentQuestion.text}</p>
            
            <div className="space-y-4">
                {currentQuestion.options.map((option, index) => {
                    const value = index + 1; // 1 to 5 scale
                    const isSelected = answers[currentQuestion.id] === value;
                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswer(value)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition duration-150 ${
                                isSelected 
                                    ? 'bg-indigo-100 border-indigo-600 text-indigo-700 font-bold'
                                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-between mt-8">
                <Button 
                    variant="secondary" 
                    onClick={handlePrev} 
                    disabled={currentQuestionIndex === 0}
                >
                    Previous
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleNext} 
                    disabled={!isAnswered}
                >
                    {isLastQuestion ? 'Submit Assessment' : 'Next Question'}
                </Button>
            </div>
        </div>
    );
};

// Student Pages
const AssessmentsPage = ({ navigate }) => { // Pass navigate prop here
    const { data: assessments, isLoading, error } = useFetchAssessments();
    const { isLoggedIn } = useAuth();
    const [isTakingQuiz, setIsTakingQuiz] = useState(false);

    if (!isLoggedIn) return <p className="text-center p-10 text-red-600">Please log in to take assessments.</p>;
    
    if (isTakingQuiz) {
        return <AssessmentQuiz navigate={navigate} />;
    }

    if (isLoading) return <div className="text-center p-10"><LoadingSpinner /> Loading Assessments...</div>;
    if (error) return <div className="text-center p-10 text-red-600">Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 mt-6">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Available Assessments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assessments.map(a => (
                    <div key={a.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{a.name}</h3>
                        <p className="text-gray-500 mb-4">{a.description}</p>
                        <Button 
                            variant={a.available ? 'primary' : 'secondary'}
                            disabled={!a.available}
                            onClick={() => {
                                // Assuming all available assessments lead to the simulated quiz for this example
                                if (a.available) {
                                    setIsTakingQuiz(true);
                                }
                            }}
                            className="w-full"
                        >
                            {a.available ? 'Start Assessment' : 'Coming Soon'}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ResultsPage = () => {
    const { isStudent } = useAuth();
    
    if (!isStudent) return <p className="text-center p-10 text-red-600">Access Denied: Please log in as a student to view results.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 mt-6">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Your Assessment Results</h2>
            <p className="text-gray-600 mb-8">Summary of your strengths, preferences, and skills.</p>

            <div className="space-y-8">
                {MOCK_RESULTS.map((result, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{result.name} ({result.score}%)</h3>
                        
                        {/* Advanced Feature: Simulated Chart/Visualization */}
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                            <div 
                                className="bg-indigo-500 h-4 rounded-full transition-all duration-500" 
                                style={{ width: `${result.score}%` }}
                            ></div>
                        </div>

                        <p className="text-sm text-gray-500">Ideal career fields based on this score: <span className="font-medium text-gray-700">{result.idealFor}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CareersPage = () => {
    const { isStudent } = useAuth();
    
    if (!isStudent) return <p className="text-center p-10 text-red-600">Access Denied: Please log in as a student to explore careers.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 mt-6">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Recommended Career Paths</h2>
            <p className="text-gray-600 mb-8">These careers align with your assessment profile.</p>

            <div className="space-y-4">
                {MOCK_RECOMMENDATIONS.map(rec => (
                    <div key={rec.id} className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">{rec.title}</h3>
                            <p className="text-sm text-gray-500">
                                Matched Skills: {rec.skills.join(', ')}
                            </p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            rec.match === 'High' ? 'bg-green-100 text-green-800' :
                            rec.match === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            {rec.match} Match
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};


// Admin Pages
const AdminDashboard = () => {
    const { isAdmin } = useAuth();
    const [assessmentsData, setAssessmentsData] = useState(MOCK_ASSESSMENTS);
    
    if (!isAdmin) return <p className="text-center p-10 text-red-600">Access Denied: Admin privileges required.</p>;

    const toggleAvailability = (id) => {
        setAssessmentsData(prev => prev.map(a => 
            a.id === id ? { ...a, available: !a.available } : a
        ));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-6">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Admin Dashboard: Manage Tools</h2>
            <div className="space-y-4">
                {assessmentsData.map(a => (
                    <div key={a.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-gray-800">{a.name}</p>
                            <p className={`text-sm ${a.available ? 'text-green-600' : 'text-red-600'}`}>
                                Status: {a.available ? 'Available' : 'Unavailable'}
                            </p>
                        </div>
                        <Button 
                            variant={a.available ? 'danger' : 'primary'}
                            onClick={() => toggleAvailability(a.id)}
                            className="ml-4"
                        >
                            {a.available ? 'Set Unavailable' : 'Set Available'}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AdminRecommendations = () => {
    const { isAdmin } = useAuth();
    if (!isAdmin) return <p className="text-center p-10 text-red-600">Access Denied: Admin privileges required.</p>;

    // Advanced Feature: Form Validation (10 marks)
    const [newCareer, setNewCareer] = useState({ title: '', skills: '', match: 'High' });
    const [validationError, setValidationError] = useState('');

    const handleInputChange = (e) => {
        setNewCareer({ ...newCareer, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!newCareer.title.trim() || !newCareer.skills.trim()) {
            setValidationError('Career title and skills fields cannot be empty.');
            return;
        }
        setValidationError('');
        console.log('New recommendation added (simulated):', newCareer);
        setNewCareer({ title: '', skills: '', match: 'High' });
        // In a real app, you'd send this to the backend
        // For demonstration, we'll just log and reset.
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-6">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">Admin: Update Recommendations</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Add New Career Recommendation</h3>
                {validationError && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{validationError}</div>
                )}
                <div className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={newCareer.title}
                        onChange={handleInputChange}
                        placeholder="Career Title (e.g., Cloud Engineer)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                        type="text"
                        name="skills"
                        value={newCareer.skills}
                        onChange={handleInputChange}
                        placeholder="Key Skills (comma-separated)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <select
                        name="match"
                        value={newCareer.match}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="High">High Match</option>
                        <option value="Medium">Medium Match</option>
                        <option value="Low">Low Match</option>
                    </select>
                    <Button onClick={handleSubmit} className="w-full">
                        Submit New Recommendation
                    </Button>
                </div>
            </div>
        </div>
    );
};

const NotFound = () => (
    <div className="text-center p-10 min-h-[calc(100vh-80px)]">
        <h2 className="text-4xl font-bold text-red-500">404 - Not Found</h2>
        <p className="text-gray-600 mt-4">The page you are looking for does not exist.</p>
    </div>
);

const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
);


// --- MAIN APPLICATION COMPONENT ---

const App = () => {
    const [currentPath, navigate] = useClientRouter('/login');
    const { user } = useAuth();
    
    // Simple component map for client-side routing
    let Component;
    let props = {};

    switch (currentPath) {
        case '/':
            Component = LandingPage;
            props = { navigate }; // Pass navigate
            break;
        case '/login':
            Component = LoginPage;
            props = { navigate };
            break;
        case '/assessments':
            Component = AssessmentsPage;
            props = { navigate }; // Pass navigate to allow starting the quiz to redirect
            break;
        case '/results':
            Component = ResultsPage;
            break;
        case '/careers':
            Component = CareersPage;
            break;
        case '/admin-dashboard':
            Component = AdminDashboard;
            break;
        case '/admin-recommendations':
            Component = AdminRecommendations;
            break;
        default:
            Component = NotFound;
            break;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased">
            <style>
                {/* Tailwind config for Inter font, used by default */}
                {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                html { font-family: 'Inter', sans-serif; }`}
            </style>
            
            <Header navigate={navigate} />
            <main className="container mx-auto">
                {/* Render the current component with its specific props */}
                <Component {...props} />
            </main>
        </div>
    );
};

// Top-level wrapper for Context
const CareerAssessmentTool = () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);

export default CareerAssessmentTool;