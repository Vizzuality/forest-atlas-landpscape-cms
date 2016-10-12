# == Schema Information
#
# Table name: pages
#
#  id           :integer          not null, primary key
#  site_id      :integer
#  name         :string
#  description  :string
#  uri          :string
#  url          :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  content      :text
#  content_type :integer
#  type         :text
#  content_js   :string
#  enabled      :boolean
#  parent_id    :integer
#  position     :integer
#

class PageTemplate < Page
end
