<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
    <link rel="stylesheet" href="css/main.css">
    <title>Kalkulator</title>
</head>
<body>
    <div class="calculator">
        <div class="calculator__display">
            <div class="calculator__content">
                <div class="calculator__content-history">
                    <button class="calculator__content-history-btn"><i class="ti ti-history"></i></button>
                </div>
                <div class="calculator__content-input">
                    <p class="calculator__content-input-p" id="calculator__content-input-p">323</p>
                </div>
                <div class="calculator__content-output">
                    <p class="calculator__content-output-p" id="calculator__content-output-p"></p>
                </div>
                <div class="calculator__content-memory">
                    <button class="calculator__content-memory-btn">MC</button>
                    <button class="calculator__content-memory-btn">MR</button>
                    <button class="calculator__content-memory-btn">M+</button>
                    <button class="calculator__content-memory-btn">M-</button>
                    <button class="calculator__content-memory-btn">MS</button>
                    <button class="calculator__content-memory-btn">M<i class="ti ti-arrow-down"></i></button>
                </div>
            </div>
        </div>
        <div class="calculator__items">
            <button class="calculator__btn calculator__btn-func" id="%">%</button>
            <button class="calculator__btn calculator__btn-func" id="CE">CE</button>
            <button class="calculator__btn calculator__btn-func" id="C">C</button>
            <button class="calculator__btn calculator__btn-func" id="delete"><i class="ti ti-backspace"></i></button>
            <button class="calculator__btn calculator__btn-func" id="divide1x">1/x</button>
            <button class="calculator__btn calculator__btn-func" id="superscript"><i class="ti ti-superscript"></i></button>
            <button class="calculator__btn calculator__btn-func" id="sqr"><i class="ti ti-math"></i></button>
            <button class="calculator__btn calculator__btn-func" id="divide"><i class="ti ti-divide"></i></button>
            <button class="calculator__btn calculator__btn-numb" id="7">7</button>
            <button class="calculator__btn calculator__btn-numb" id="8">8</button>
            <button class="calculator__btn calculator__btn-numb" id="9">9</button>
            <button class="calculator__btn calculator__btn-func" id="multiplication">x</button>
            <button class="calculator__btn calculator__btn-numb" id="4">4</button>
            <button class="calculator__btn calculator__btn-numb" id="5">5</button>
            <button class="calculator__btn calculator__btn-numb" id="6">6</button>
            <button class="calculator__btn calculator__btn-func" id="minus"><i class="ti ti-minus"></i></button>
            <button class="calculator__btn calculator__btn-numb" id="1">1</button>
            <button class="calculator__btn calculator__btn-numb" id="2">2</button>
            <button class="calculator__btn calculator__btn-numb" id="3">3</button>
            <button class="calculator__btn calculator__btn-func" id="plus"><i class="ti ti-plus"></i></button>
            <button class="calculator__btn calculator__btn-numb" id="plusMinus"><i class="ti ti-plus-minus"></i></button>
            <button class="calculator__btn calculator__btn-numb" id="0">0</button>
            <button class="calculator__btn calculator__btn-numb" id="comma">,</button>
            <button class="calculator__btn calculator__btn-sum" id="sum"><i class="ti ti-equal"></i></button>
        </div>
    </div>
    <script src="js/script.js"></script>
</body>
</html>