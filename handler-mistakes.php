<?php

if ($_POST['_sendEmail'] === 'bot') {
  echo 'Spambotes are attacking';
} else {
  if (isset($_POST['imyarek']) && isset($_POST['telefono']) && $_POST['sendEmail'] === 'human') {
    $name = trim(strip_tags($_POST['imyarek']));
    //$phoneNumber = trim(strip_tags($_POST['telefono']));
    $email = trim(strip_tags($_POST['pochta']));
    $comment = trim(strip_tags($_POST['comment']));
    $question = trim(strip_tags($_POST['voprosiki']));
    $products = implode(', ', $_POST['products']);
    $ip = $_SERVER['REMOTE_ADDR'];

    // Накапливаю в буфер, чтобы передать в шаблон письма
    ob_start();
    if (!empty($products)) { ?>
      <tr>
        <th style="width: 200px; text-align: left;">Product(s)</th>
        <td><?php echo $products; ?></td>
      </tr>
      <tr>
        <th style="width: 200px; text-align: left;">&nbsp;</th>
        <td>&nbsp;</td>
      </tr>
      <?php
    }
    if (!empty($name)) { ?>
      <tr>
        <th style="width: 200px; text-align: left;">Name</th>
        <td><?php echo $name; ?></td>
      </tr>
      <?php
    }
    if (!empty($phoneNumber)) { ?>
      <tr>
        <th style="width: 200px; text-align: left;">Телефон</th>
        <td><?php echo $phoneNumber; ?></td>
      </tr>
      <?php
    }
    if (!empty($email)) { ?>
      <tr>
        <th style="width: 200px; text-align: left;">Email Address</th>
        <td><?php echo $email; ?></td>
      </tr>
      <?php
    }
    if (!empty($comment)) { ?>
      <tr>
        <th style="width: 200px; text-align: left;">&nbsp;</th>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <th style="width: 200px; text-align: left;">Комментарий</th>
        <td><?php echo $comment; ?></td>
      </tr>
      <?php
    }
    if (!empty($question)) { ?>
      <tr>
        <th style="width: 200px; text-align: left;">&nbsp;</th>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <th style="width: 200px; text-align: left;">Question</th>
        <td><?php echo $question; ?></td>
      </tr>
      <?php
    }
    $data = ob_get_clean();

    $to = 'grom272008@yandex.ru';
    $subject = 'From site ' . $_SERVER['HTTP_HOST'];

    $message = '
        <html>
            <head>
              <title>Guest ' . $name . ' from site ' . $_SERVER['HTTP_HOST'] . '</title>
            </head>
            <body>
            <p>Guest ' . $name . ' from site ' . $_SERVER['HTTP_HOST'] . '</p>
              <table style="border-collapse: collapse; width: 800px;">
                <tr>
                  <th style="width: 200px; text-align: left;">&nbsp;</th>
                  <td>&nbsp;</td>
                </tr>
                ' . $data . '
                <tr>
                  <th style="width: 200px; text-align: left;">&nbsp;</th>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <th style="width: 200px; text-align: left;">Заявка со страницы</th>
                  <td>' . $_SERVER['HTTP_REFERER'] . '</td>
                </tr>
                <tr>
                  <th style="width: 200px; text-align: left;">IP адрес гостя</th>
                  <td>' . $ip . '</td>
                </tr>
              </table>
            </body>
        </html>
        ';

    $headers = "From: " . "no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n" .
      "MIME-Version: 1.0" . "\r\n" .
      "Content-type: text/html; charset=utf-8" . "\r\n";

    mail($to, $subject, $message, $headers);

    header('Location: /');

    exit;
  }
}
