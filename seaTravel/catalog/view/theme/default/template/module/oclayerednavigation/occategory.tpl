<?php echo $header; ?>
<div class="container layer-category main">
    <div class="layered-navigation-block"></div>
    <div class="ajax-loader">
        <img src="<?php echo $oclayerednavigation_loader_img; ?>" alt="" />
    </div>
    <ul class="breadcrumb">
        <?php foreach ($breadcrumbs as $breadcrumb) { ?>
        <li><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
        <?php } ?>
    </ul>
    <div class="row"><?php echo $column_left; ?>
        <?php if ($column_left && $column_right) { ?>
        <?php $class = 'col-sm-6'; ?>
        <?php } elseif ($column_left || $column_right) { ?>
        <?php $class = 'col-lg-9 col-md-9 col-sm-12 col-xs-12'; ?>
        <?php } else { ?>
        <?php $class = 'col-sm-12'; ?>
        <?php } ?>
        <div id="content" class="<?php echo $class; ?>"><?php echo $content_top; ?>
            <h2 class="name-category"><?php echo $heading_title; ?></h2>
            <?php if ($thumb || $description) { ?>
            <div class="row">
                <?php if ($thumb) { ?>
                <div class="thumb-img"><img src="<?php echo $thumb; ?>" alt="<?php echo $heading_title; ?>" title="<?php echo $heading_title; ?>" class="img-thumbnail" /></div>
                <?php } ?>
                <?php if ($description) { ?>
                <div class="description-category"><?php echo $description; ?></div>
                <?php } ?>
            </div>
            <?php } ?>
            <div class="custom-category row">
                <?php if ($products) { ?>
                <p class="compare-total"><a href="<?php echo $compare; ?>" id="compare-total"><?php echo $text_compare; ?></a></p>
                <!-- product fillter -->
                <div class="product-filter">
                  <div class="sort-lg">
                      <button type="button"  class="btn btn-default grid-view" id="grid-view"  title="<?php echo $button_grid; ?>">grid</button>
                      <button type="button"   class="btn btn-default list-view" id="list-view"  title="<?php echo $button_list; ?>">list</button>
                    <select id="input-sort" onchange="oclayerednavigationajax.filter(this.value)">
                            <?php foreach ($sorts as $sorts2) { ?>
                            <?php if ($sorts2['value'] == $sort . '-' . $order) { ?>
                                <option value="<?php echo $sorts2['href']; ?>" selected="selected"><?php echo $sorts2['text']; ?></option>
                            <?php } else { ?>
                                <option value="<?php echo $sorts2['href']; ?>"><?php echo $sorts2['text']; ?></option>
                            <?php } ?>
                        <?php } ?>
                        </select>
                    <label class="control-label" for="input-sort"><?php echo $text_sort; ?></label>
                  </div>
                  <div class="show-page">
                    <label class="control-label" for="input-limit"><?php echo $text_limit; ?></label>
                    <select id="input-limit" onchange="oclayerednavigationajax.filter(this.value)">
                            <?php foreach ($limits as $limits2) { ?>
                            <?php if ($limits2['value'] == $limit) { ?>
                            <option value="<?php echo $limits2['href']; ?>" selected="selected"><?php echo $limits2['text']; ?></option>
                            <?php } else { ?>
                            <option value="<?php echo $limits2['href']; ?>"><?php echo $limits2['text']; ?></option>
                            <?php } ?>
                            <?php } ?>
                    </select>
                    
                      <?php echo $pagination; ?>
                  </div>
                </div>
                <!-- product fillter -->
                <div class="custom-products">
                    <div class="row">
                    <?php foreach ($products as $product) { ?>
                    <div class="product-layout product-list col-xs-12">
                        <div class="product-thumb row">
                            <div class="item-inner">
							<div class="oc-box-content">
                                <div class="label-product">
								<?php if ($product['is_new']) :
									if($product['special'])	: ?>
										<div class="label-pro-new"> sale </div>
									<?php else : ?>
										<div class="label-pro-new"> new </div>
									<?php endif; ?>
								<?php else: ?>
									<?php if($product['special']): ?>
										<div class="label-pro-new"> sale </div>
									<?php endif; ?>
								<?php endif; ?>
                                </div>
								<div class="top-inner">
									<h2 class="product-name">
										<a href="<?php echo $product['href']; ?>"><?php echo $product['name']; ?></a>
									</h2>
									
										<?php if ($product['price']) { ?>
										<div class="price-box">
											<?php if (!$product['special']) { ?>
												<span class="price"><?php echo $product['price']; ?></span>
											<?php } else { ?>
												<p class="old-price"><span class="price"><?php echo $product['price']; ?></span></p>
												<p class="special-price"><span class="price"><?php echo $product['special']; ?></span></p>
											<?php } ?>
										</div>
										<?php } ?>
									
									<?php if (isset($product['rating'])) { ?>
										<div class="ratings">
											<div class="rating-box">
												<?php for ($i = 0; $i <= 5; $i++) { ?>
													<?php if ($product['rating'] == $i) {
														$class_r= "rating".$i;
														echo '<div class="'.$class_r.'">rating</div>';
													} 
												}  ?>
											</div>
										</div>
									<?php } ?>
									<div class="short-des"><?php echo substr($product['description'],0,300).' . . .'; ?><br /><a class="readmore" href="<?php echo $product['href']; ?>"><?php echo $text_readmore; ?></a></div>
								</div><!-- top-inner -->
								<div class="products">
									<?php if ($product['thumb']) { ?>
										<a class="product-image" href="<?php echo $product['href']; ?>">
											<div class="product-image">
												<img class="img2" src="<?php echo $product['rotator_image']; ?>" alt="<?php echo $product['name']; ?>" />
												<img class="img1" src="<?php echo $product['thumb']; ?>" alt="<?php echo $product['name']; ?>" />
											</div>
										</a>
									<?php } else { ?>
										<a class="product-image" href="<?php echo $product['href']; ?>">
											<div class="product-image">
												<img src="image/cache/no_image-100x100.png" alt="<?php echo $product['name']; ?>" />
											</div>
										</a>
									<?php } ?>
									
										<div class="des"><?php echo $product['description']; ?></div>
									
									<div class="actions">
										
											<button class="button btn-cart" type="button" data-toggle="tooltip" title="<?php echo $button_cart; ?>" onclick="cart.add('<?php echo $product['product_id']; ?>');">
												<span><i class="fa fa-shopping-cart"></i><?php echo $button_cart; ?></span>
											</button>
										
										<ul class="add-to-links">
											<li>
												<a class="link-wishlist fa fa-heart" title="<?php echo $button_wishlist; ?>" data-toggle="tooltip" onclick="wishlist.add('<?php echo $product['product_id']; ?>');">
													<em><?php echo $button_wishlist; ?></em>
												</a>
											</li>
											<li>
												<a class="link-compare fa fa-refresh" title="<?php echo $button_compare; ?>" data-toggle="tooltip" onclick="compare.add('<?php echo $product['product_id']; ?>');">
													<em><?php echo $button_compare; ?></em>
												</a>
											</li>
										</ul>
									</div><!-- actions -->
								</div><!-- products -->
							</div><!-- oc-box-content -->
						</div> <!-- item-inner -->
                        </div>
                    </div>
                    <?php } ?>
                </div>
                </div><!--custom-products-->
                <!-- product fillter -->
                <div class="product-filter ">
                  <div class="sort-lg">
                      <button type="button"  class="btn btn-default grid-view" id="grid-view"  title="<?php echo $button_grid; ?>">grid</button>
                      <button type="button"   class="btn btn-default list-view" id="list-view"  title="<?php echo $button_list; ?>">list</button>
                    
                    <select id="input-sort" onchange="oclayerednavigationajax.filter(this.value)">
                        <?php foreach ($sorts as $sorts2) { ?>
                            <?php if ($sorts2['value'] == $sort . '-' . $order) { ?>
                                <option value="<?php echo $sorts2['href']; ?>" selected="selected"><?php echo $sorts2['text']; ?></option>
                            <?php } else { ?>
                                <option value="<?php echo $sorts2['href']; ?>"><?php echo $sorts2['text']; ?></option>
                            <?php } ?>
                        <?php } ?>
                        </select>
                    <label class="control-label" for="input-sort"><?php echo $text_sort; ?></label>
                  </div>
                  <div class="show-page">
                    <label class="control-label" for="input-limit"><?php echo $text_limit; ?></label>
                    <select id="input-limit" onchange="oclayerednavigationajax.filter(this.value)">
                            <?php foreach ($limits as $limits2) { ?>
                            <?php if ($limits2['value'] == $limit) { ?>
                            <option value="<?php echo $limits2['href']; ?>" selected="selected"><?php echo $limits2['text']; ?></option>
                            <?php } else { ?>
                            <option value="<?php echo $limits2['href']; ?>"><?php echo $limits2['text']; ?></option>
                            <?php } ?>
                            <?php } ?>
                    </select>
                      <?php echo $pagination; ?>
                  </div>
                </div>
                <!-- product fillter -->
                <?php } ?>
                <?php if (!$categories && !$products) { ?>
                <p><?php echo $text_empty; ?></p>
                <div class="buttons">
                    <div class="pull-right"><button class="button" onclick="window.location.href='<?php echo $continue; ?>'"><span><?php echo $button_continue; ?></span></button></div>
                </div>
                <?php } ?>
            </div>
            <?php echo $content_bottom; ?></div>
        <?php echo $column_right; ?></div>
</div>
<?php echo $footer; ?>
