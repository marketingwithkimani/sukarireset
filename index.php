<?php
header('Content-Type: text/html; charset=utf-8');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Resolve the project root regardless of which directory this file is called from
$project_root = __DIR__;
// Support for being called from api/ subdirectory
if (basename(__DIR__) === 'api') {
    $project_root = dirname(__DIR__);
}
$content_path = $project_root . '/data/content.json';
if (file_exists($content_path)) {
    $content = json_decode(file_get_contents($content_path), true);
} else {
    die("Error: content.json not found at " . $content_path);
}

// Support for AJAX requests (only return the inner content)
if (isset($_GET['ajax'])) {
    $page = isset($_GET['p']) ? $_GET['p'] : 'home';
    $view_file = $project_root . "/views/$page.php";
    if (file_exists($view_file)) {
        include $view_file;
    } else {
        echo "View not found: $page";
    }
    exit;
}

// Support for clean URLs or specific page redirects
if (isset($_GET['p']) && $_GET['p'] !== 'home') {
    $target = $_GET['p'];
    header("Location: /#$target");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sukari Reset — Gentle Blood Sugar Companion for Kenyans</title>
    <meta name="description" content="Sukari Reset is a premium lifestyle companion for Kenyans living with Type 2 diabetes and prediabetes.">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN (For Design Preservation) -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- GSAP for Animations -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- Supabase JS -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

    <style>
        :root {
            --primary-gold: #cfa85c;
            --primary-emerald: #2D6A4F;
            --bg-dark: #0A1710; /* Darker emerald-tinted black for better brand alignment */
            --bg-card: #121f18; /* Dark emerald card */
        }

        body {
            font-family: 'Outfit', 'Inter', sans-serif;
            background-color: var(--bg-dark);
            color: white;
            overflow-x: hidden;
        }

        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Outfit', sans-serif; }

        .selection-gold::selection {
            background-color: rgba(207, 168, 92, 0.3);
            color: var(--primary-gold);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0A1710; }
        ::-webkit-scrollbar-thumb { background: #1a2e23; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #2D6A4F; }

    </style>
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        gold: '#cfa85c',
                        emerald: {
                            50: '#F0FAF4',
                            100: '#D9F2E6',
                            200: '#B3E5CD',
                            300: '#8CD8B4',
                            400: '#66CB9B',
                            500: '#40BE82',
                            600: '#339868',
                            700: '#26724E',
                            800: '#1B4332',
                            900: '#0A1710',
                            950: '#050C08',
                        },
                        dark: '#0A1710',
                        card: '#121f18',
                    },
                    fontFamily: {
                        sans: ['Outfit', 'Inter', 'sans-serif'],
                        display: ['Space Grotesk', 'sans-serif'],
                        serif: ['Playfair Display', 'serif'],
                    }
                }
            }
        }
    </script>
</head>
<body class="selection-gold flex flex-col justify-between min-h-screen">

    <?php include $project_root . '/includes/navbar.php'; ?>

    <main id="content-area" class="flex-grow pt-20">
        <!-- Content will be swapped via AJAX/Hash routing -->
        <div id="page-container">
            <?php include $project_root . '/views/home.php'; ?>
        </div>
    </main>

    <?php include $project_root . '/includes/footer.php'; ?>

    <?php include $project_root . '/includes/chat_widget.php'; ?>

    <!-- App Logic -->
    <script src="js/app.js"></script>
</body>
</html>
