<?php echo $header; ?>
<?php echo $top_container; ?>
<div class="main">
  <div class="container main-inner">
  <div class="row">
    <?php echo $column_left; ?>
      <?php if ($column_left && $column_right) { ?>
      <?php $class = 'col-sm-6'; ?>
      <?php } elseif ($column_left || $column_right) { ?>
      <?php $class = 'col-lg-9 col-md-9 col-sm-12 col-xs-12'; ?>
      <?php } else { ?>
      <?php $class = 'col-sm-12'; ?>
      <?php } ?>
    <div id="content" class="<?php echo $class; ?>">
      <?php echo $content_top; ?>
      <div class="testimonial-newleter">
        <?php echo $content_bottom; ?>
      </div>
    </div><!--#content-->
    <?php echo $column_right; ?>
    <div class="oc-block-bottom">
      
          <?php echo $block1; ?>
        
  </div><!-- .oc-block-bottom-->
  <?php echo $footer; ?>
  </div>
  </div>
  
</div><!-- .main-->
</body></html>